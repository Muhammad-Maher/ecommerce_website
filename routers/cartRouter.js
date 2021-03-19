const express = require("express");
const cartRouter = new express.Router();

const Cart = require("../models/cartsCollection");

const authentication = require('../middelware/authontication');
const adminstration = require('../middelware/adminstration');
const mangement = require('../middelware/mangement');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




cartRouter.use(authentication)

cartRouter.post("/add", async(req, res) => {
    try {

        const { userID, productID } = req.body;
        const cart = await Cart.create({ userID: userID, productID: productID })

        res.json("cart created successfully");
    } catch (error) {

        res.statusCode = 422;
        res.send(error);
    }
})


cartRouter.get('/get', async(req, res) => {
    try {
        //Nested population
        const cart = await Cart.findOne({ userID: "req.body.userID" }).populate([{ path: 'productID', populate: ('resturantID') }, 'userID']);
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