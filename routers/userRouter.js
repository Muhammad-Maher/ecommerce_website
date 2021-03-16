const express = require('express');
const User = require('../models/usersCollection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const userRouter = new express.Router();
const authentication = require('../middelware/authontication');
const aminstration = require('../middelware/adminstration');
/////////Base (/api/user)


// ////SignUP
// userRouter.post('/register',
//     body('username').isLength({ min: 3 })
//     .withMessage('enter valide username with length more than 3'),
//     body('email').isEmail().withMessage('enter valide email'),
//     //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
//     body("Password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long'), async(req, res) => {
//         try {
//             const username = req.body.username;
//             const Password1 = req.body.Password;
//             const mail = req.body.email;
//             const img = req.body.img;
//             const gender = req.body.gender;
//             const status = "user";
//             const hash = await bcrypt.hash(Password1, 10)
//             const user1 = await User.create({ username, Password: hash, mail, gender, img, status });
//             res.statusCode = 201;
//             res.send(user1);
//         } catch (error) {
//             res.statusCode = 422;
//             res.send(error);
//         }
//     })

// /////Login
// userRouter.post('/login',
//     body('username').isLength({ min: 3 })
//     .withMessage('enter valide username with length more than 3'),
//     //Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character
//     body("Password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, "i").withMessage('Password should be combination of one uppercase , one lower case, one special char, one digit and min 8 , max 20 char long')

//     , async(req, res) => {
//         try {
//             const logname = await User.findOne({ username: req.body.username }).exec();
//             if (!logname) throw new Error('wrong username or password');
//             const logPass = await bcrypt.compare(req.body.Password, logname.Password)
//             if (!logPass) throw new Error('wrong username or password');
//             //generate token and send to user
//             const token = jwt.sign({ id: logname._id }, 'my-signing-secret')
//             res.json({ token });
//         } catch (err) {
//             if (err) {
//                 res.statusCode = 422;
//                 res.json({ success: false, message: err.message });
//                 return;
//             }
//         }

//     });


userRouter.use(authentication)
    /////Allowed for all users

userRouter.use(aminstration)
    /////Allowed for Admins only

userRouter.get("/all", async(req, res, next) => {

    try {

        const usersData = await User.find({});
        res.send(usersData);

    } catch (error) {

    }

})

userRouter.get('/profile', async(req, res) => {
    try {
        console.log("DFDHfdh")
        res.send("OK")
    } catch (error) {
        if (err) {
            res.statusCode = 401;
            res.json({ success: false, message: "Authenticationfail" })
            return;
        }
    }
})
module.exports = userRouter;