const User = require('../models/usersCollection');
module.exports= async(req, res, next)=>{
    try {
        const user = await User.findOne({ _id: req.signedData.id });
            if(user.status==="manger" && user.BrandID===req.params.id)
            {
                next();
            }else if(user.status==="admin"){
                next();
            }else{
                throw new Error('Not Allowed');
            }        
    } catch (error) {
        res.statusCode = 401;
        console.log(req.params.id);
        res.json({success: false, message: "Not Allowed"})
    }
}