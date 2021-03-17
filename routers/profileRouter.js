const express = require('express');
const Product = require('../models/productsCollection');
const Resturant = require('../models/resturantsCollection');
const User = require('../models/usersCollection');
const Order = require('../models/ordersCollection');
const profileRouter = new express.Router();
const authentication = require('../middelware/authontication');
const adminstration = require('../middelware/adminstration');
const mangement = require('../middelware/mangement');
const { reset } = require('nodemon');

// profileRouter.use(authentication)
/////Allowed for all users


profileRouter.get("/:id", authentication, async(req, res, next) => {

    try {

        const userData = await (await User.findOne({ _id: req.params.id }).populate('BrandID'));
        const userOrders = await Order.find({ userID: req.params.id }).populate("userID").exec();
        res.json({ userData, userOrders });


    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }

})

profileRouter.patch("/:id", authentication, async(req, res, next) => {

    try {
        const userData = await (await User.findOne({ _id: req.params.id }).populate('BrandID'));

        // const { username, Password, mail, gender, fname, lname, Phone, governorater, Address, country, img, BrandID } = userData;

        // const { username, Password, mail, gender, fname, lname, Phone, governorater, Address, country, img, BrandID } = req.body;

        const username = req.body.username || userData.username;
        const mail = req.body.mail || userData.mail;
        const gender = req.body.gender || userData.gender;
        const fname = req.body.fname || userData.fname;
        const lname = req.body.lname || userData.lname;
        const Phone = req.body.Phone || userData.Phone;
        const governorater = req.body.governorater || userData.governorater;
        const Address = req.body.Address || userData.Address;
        const country = req.body.country || userData.country;
        const img = req.body.img || userData.img;
        const BrandID = req.body.BrandID || userData.BrandID;





        const checkForAdmin = await User.findOne({ _id: req.signedData.id })

        if (checkForAdmin.status == "admin") {
            status = req.body.status || userData.status;
        }

        const userUpdateData = await User.updateOne({ _id: req.params.id }, { username, mail, gender, fname, lname, Phone, governorater, Address, country, img, status, BrandID });

        res.json({ message: "Updated successfully" });

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }

})

profileRouter.delete("/:id", authentication, async(req, res, next) => {

    try {

        await User.findOneAndRemove({ _id: req.params.id });
        await Order.updateMany({ "userID": req.params.id }, { "$pull": { "userID": req.body.id } });

        res.json({ message: "Deleted successfully" });

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }

})


profileRouter.use(mangement)
    ///Allowed for Admins only

module.exports = profileRouter;