const express = require("express");
const Product = require("../models/ProductCollection");
const cartRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require('../middelware/authontication');
const upload = require('../middelware/upload');
const imgUploadCloud = require('../middelware/cloudinary');
const User = require("../models/usersCollection");
const Cart = require("../models/cartsCollection");
const fs = require('fs');


cartRouter.use(authentication)

cartRouter.post("/add", async(req, res) => {

    try {

        const cart = await Cart.create()
    } catch (error) {

    }
})


module.exports = cartRouter