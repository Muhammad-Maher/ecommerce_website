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

        console.log(req.body);
        // res.send("here")

        const { userID, productID } = req.body;
        const Oldcart = await Cart.findOne({ userID }).populate([{ path: 'productID', populate: ('resturantID') }, 'userID']);
        // res.send(products);
        let cart;
        if (Oldcart) {
            let products = Oldcart.productID
            products.push(productID);
            cart = await Cart.updateOne({ userID: userID }, { productID: products })
            res.json("cart updated successfully");
        } else {

            cart = await Cart.create({ userID: userID, productID: [productID] })
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

cartRouter.delete('/remove/:userID/:productID/:index', async(req, res) => {
    try {

        const { userID, productID, index } = req.params;

        // console.log(req.params)
        // res.send("here")

        const Oldcart = await Cart.findOne({ userID });
        let products = Oldcart.productID
            // products = products.filter(item => item !== productID);
        products.splice(index, 1);
        // res.send(products)
        const cart = await Cart.updateOne({ userID: userID }, { productID: products });
        res.json("product removed successfully");

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