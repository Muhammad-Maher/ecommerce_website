const express = require('express');
const brandRouter = new express.Router();
const Brand = require('../models/brandsCollection');
const Product = require('../models/ProductCollection');
const authentication = require('../middelware/authontication');
const adminstration = require('../middelware/adminstration');
const mangement = require('../middelware/mangement');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');

////////Base /api/brand

brandRouter.use(authentication)
    /////Allowed for all users
brandRouter.get('/:id', async(req, res) => {
    try {
        const brand = await Brand.findOne({ _id: req.params.id }, { _id: 0 });
        res.send(brand);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

//brandRouter.use(aminstration)
/////Allowed for Admins only


brandRouter.post('/',
    body('Name').isLength({ min: 3 })
    .withMessage('enter valide name with length more than 3'),
    body('mail').isEmail().withMessage('enter valide email'),
    //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
    body("Password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'), adminstration, async(req, res) => {
        try {

            const { Name, img, Description, contactNo, mail } = req.body;
            const Password = await bcrypt.hash(req.body.Password, 10)
            const brand = await Brand.create({ Name, img, Description, contactNo, mail, Password });
            res.send(brand)
        } catch (error) {
            res.statusCode = 422;
            res.send(error);
        }
    });
brandRouter.patch('/:id',
    body('Name').isLength({ min: 3 })
    .withMessage('enter valide name with length more than 3'),
    body('mail').isEmail().withMessage('enter valide email'),
    mangement, async(req, res) => {
        try {
            const brand = await Brand.findOne({ _id: req.params.id })
            const Name1 = req.body.Name || brand.Name;
            const img1 = req.body.img || brand.img;
            const Description1 = req.body.Description || brand.Description;
            const contactNo1 = req.body.contactNo || brand.contactNo;
            const mail1 = req.body.mail || brand.mail;
            if (req.body.Password) {
                const Password1 = await bcrypt.hash(req.body.Password, 10);
                const updatedBrand = await Brand.updateOne({ _id: req.params.id }, {
                    $set: {
                        Password: Password1
                    }

                })
            }
            const updatedBrand = await Brand.updateOne({ _id: req.params.id }, {
                $set: {
                    Name: Name1,
                    img: img1,
                    Description: Description1,
                    contactNo: contactNo1,
                    mail: mail1
                }

            })
            res.send(updatedBrand)

        } catch (error) {
            res.statusCode = 422;
            res.send(error);
        }
    })

brandRouter.delete('/:id', adminstration, async(req, res) => {
    try {
        const products = await Product.deleteMany({ BrandID: req.params.id });
        const brand = await Brand.deleteOne({ _id: req.params.id });
        res.send(brand);
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})

module.exports = brandRouter;