const User = require('../models/usersCollection');
module.exports = async(req, res, next) => {
    try {
        // console.log("here")
        const user = await User.findOne({ _id: req.signedData.id });
        if (user.status === "admin") {
            next();
        } else
            throw new Error('Not Allowed');
    } catch (error) {
        res.statusCode = 401;
        res.json({ success: false, message: "Not Allowed" })
    }
}