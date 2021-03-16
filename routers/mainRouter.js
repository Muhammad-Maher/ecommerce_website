const express = require("express");
const Product = require("../models/ProductCollection");

const Cart = require("../models/cartsCollection");


const Brand = require('../models/brandsCollection');

const mainRouter = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const authentication = require('../middelware/authontication');
const upload = require('../middelware/upload');
const imgUploadCloud = require('../middelware/cloudinary');
const User = require("../models/usersCollection");
const fs = require('fs');
const { body, validationResult } = require('express-validator');


mainRouter.get('/home', async(req, res, next) => {

    try {


        const saleItems = await Product.find({ status: "sale" })
            .exec((err, data) => {

                res.send(data);
            })
    } catch (err) {
        res.statusCode = 401;
        res.json(err);
        // next();
    }
})

mainRouter.get('/about', async(req, res, next) => {
    try {

        res.send("some information ");

    } catch (err) {

        res.statusCode = 401;
        res.json(err);
        // next();
    }
})





mainRouter.post('/register',
    body('username').isLength({ min: 3 })
    .withMessage('enter valide username with length more than 3'),
    body('mail').isEmail().withMessage('enter valide email'),
    upload.single('avatar'), async(req, res, next) => {
        try {

            const result = await imgUploadCloud(req, "/users/");

            try {
                fs.unlinkSync(req.file.path)
            } catch (err) {
                console.error(err)
            }

            const { username, Password, mail, gender, fname, lname, Phone, governorater, Address, country, status, BrandID } = req.body;

            img = result.url;
            const hash = await bcrypt.hash(Password, 10);
            const user = await User.create({ username, Password: hash, mail, gender, fname, lname, Phone, governorater, Address, country, img, status, BrandID });

            res.statusCode = 201;
            res.send({ message: 'user was registered successfully' });
        } catch (err) {

            res.statusCode = 422;
            res.send(err);
            // next();
        }

    })

mainRouter.post('/login',
    body('username').isLength({ min: 3 })
    .withMessage('enter valide username with length more than 3'),
    async(req, res, next) => {
        try {


            const { password, username } = req.body;
            const user = await User.findOne({ username }).exec();
            if (!user) throw new Error("wrong user name or password");
            const isMatched = await bcrypt.compare(password, user.Password);
            if (!isMatched) throw new Error("wrong user name or password");
            const token = await jwt.sign({ id: user.id }, "my-signing-secret");
            res.json({ token });
        } catch (err) {
            res.statusCode = 422;
            res.json({ success: false, message: err.message });
            return;
        }
    })

mainRouter.post('/search', async(req, res, next) => {
    try {

        const { searchWord } = req.body;
        const searchResult = Product.find({ "Name": { $regex: searchWord } })
            .exec((err, data) => {
                res.json(data);
            })
    } catch (err) {
        res.statusCode = 500;
        res.json(err);
        // next();
    }
})

mainRouter.get('/order/all', async(req, res, next) => {
    try {


        const allOrderes = await Product.find({})
            .exec((err, data) => {
                res.json(data);
            })

    } catch (err) {

        res.statusCode = 500;
        res.json(err);
        // next();
    }

})

mainRouter.get('/product/offers', async(req, res, next) => {
    try {


        const allOffers = await Product.find({ "status": "sale" })
            .exec((err, data) => {
                res.json(data);
            })

    } catch (err) {
        res.statusCode = 500;
        res.json(err);
        // next();
    }

})
module.exports = mainRouter;