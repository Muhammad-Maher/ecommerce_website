const express = require('express');
const orderRouter = new express.Router();
const Order = require('../models/ordersCollection');
const User = require('../models/usersCollection');
const authentication = require('../middelware/authontication');
const aminstration = require('../middelware/adminstration');
const fs = require('fs');

////////Base /api/order

orderRouter.use(authentication)
    /////Allowed for all users
orderRouter.post('/:id', async(req, res) => {
    try {
        // const status= req.body.status;
        const total = req.body.total;
        const productID = req.body.productID;
        const status = req.body.status;
        const userID = req.params.id;
        const order = await Order.create({ userID, productID, total, status });
        res.send(order);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }

})

orderRouter.get('/:id/:oid', async(req, res) => {
    try {
        const order = await (await Order.findOne({ userID: req.params.id, _id: req.params.oid }).populate(['productID', 'userID']));
        res.send(order);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
});
////api/order/:id(GET) //all orders
orderRouter.get('/:id', async(req, res) => {
    try {
        const orders = await Order.find({ userID: req.params.id }).populate(['productID', 'userID']);
        res.send(orders);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
});

orderRouter.delete('/:id/:oid', async(req, res) => {
    try {
        const orders = await Order.findOne({ _id: req.params.oid }).populate(['productID', 'userID']);
        if (orders.status === 'pending') {

            const order = await Order.deleteOne({ _id: req.params.oid }).populate(['productID', 'userID']);
            res.json("deleted successfully");
            return;
        } else {
            const user = await User.findOne({ _id: req.signedData.id }).populate(['productID', 'userID']);

            if (user.status === "admin") {

                const order = await Order.deleteOne({ _id: req.params.oid });
                res.json("deleted successfully");
                return;
            } else {
                throw new Error('Not Allowed');
            }
        }

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

orderRouter.use(aminstration)
    /////Allowed for Admins only

//only admin can edit order and change its status
orderRouter.patch('/:id/:oid', async(req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.oid }).populate(['productID', 'userID']);
        const status1 = req.body.status || order.status;
        const updatedorder = await Order.updateOne({ _id: req.params.oid }, {
            $set: {
                status: status1
            }
        });
        res.send(updatedorder)
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})


module.exports = orderRouter;