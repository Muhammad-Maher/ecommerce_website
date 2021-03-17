const express = require('express');
const User = require('../models/usersCollection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const userRouter = new express.Router();
const authentication = require('../middelware/authontication');
const adminstration = require('../middelware/adminstration');
/////////Base (/api/user)





userRouter.use(authentication)
    /////Allowed for all users



userRouter.get("/all", async(req, res, next) => {

    try {

        const usersData = await User.find({});
        res.send(usersData);

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }

})

userRouter.get('/profile', async(req, res) => {
    try {

        const { userID } = req.body;
        const user = await User.findOne({ _id: userID }).exec();
        res.send(user);

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})


userRouter.patch('/profile', async(req, res) => {
    try {

        const userID = req.body.userID;
        const oldData = await User.findOne({ _id: userID }).exec();


        const username = req.body.username || oldData.username;
        const mail = req.body.mail || oldData.mail;
        const gender = req.body.gender || oldData.gender;
        const fname = req.body.fname || oldData.fname;
        const lname = req.body.lname || oldData.lname;
        const Phone = req.body.Phone || oldData.Phone;
        const governorater = req.body.governorater || oldData.governorater;
        const Address = req.body.Address || oldData.Address;
        const country = req.body.country || oldData.country;
        const status = req.body.status || oldData.status;
        const BrandID = req.body.BrandID || oldData.BrandID;


        const user = await User.updateOne({ _id: userID }, {
            username: username,
            mail: mail,
            gender: gender,
            fname: fname,
            lname: lname,
            Phone: Phone,
            governorater: governorater,
            Address: Address,
            country: country,
            status: status,
            BrandID: BrandID,
        });
        res.json("user updated successfully");

    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }


})


userRouter.use(adminstration)
    /////Allowed for Admins only

userRouter.delete("/delete", async(req, res) => {
    try {
        const userID = req.body.userID;
        const user = await User.deleteOne({ _id: userID });
        res.json("user Deleted successfully")
    } catch (error) {
        res.statusCode = 422;
        res.send(error);
    }
})
module.exports = userRouter;