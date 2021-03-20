const express = require("express");
const cartRouter = new express.Router();

const Cart = require("../models/cartsCollection");

const authentication = require('../middelware/authontication');
const adminstration = require('../middelware/adminstration');
const mangement = require('../middelware/mangement');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




// cartRouter.use(authentication)

cartRouter.post("/add", async(req, res) => {
    try {

        const { userID, productID } = req.body;
        const Oldcart = await Cart.findOne({ userID }).populate([{ path: 'productID', populate: ('resturantID') }, 'userID']);
        let products = Oldcart.productID
            // res.send(products);
        let cart;
        if (Oldcart) {

            products.push(productID);
            cart = await Cart.updateOne({ userID: userID }, { productID: products })
            res.json("cart updated successfully");
        } else {

            cart = await Cart.create({ userID: userID, productID: productID })
            res.json("cart created successfully");
        }



    } catch (error) {

        res.statusCode = 422;
        res.send(error);
    }
})


cartRouter.get('/get/:id', async(req, res) => {
    try {

        // Nested population
        const cart = await Cart.findOne({ userID: req.params.id }).populate([{ path: 'productID', populate: ('resturantID') }, 'userID']);
        res.send(cart);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
});


cartRouter.patch('/update', async(req, res) => {
    try {

        const { userID, productID } = req.body;


        const cart = await Cart.updateOne({ userID: userID }, { productID: productID });

        res.json("cart updated successfully");

    } catch (error) {

        res.statusCode = 422;
        res.send(error);
    }
})


module.exports = cartRouter;