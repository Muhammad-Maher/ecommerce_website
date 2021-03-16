const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

imgUploadCloud = async(req) => {

    const imageName = await req.file.originalname.split(".")
    await imageName.pop()
    await imageName.join()

    return cloudinary.uploader.upload(req.file.path, { public_id: "store/users/" + imageName }, async(error, result) => {
        try {

        } catch (error) {
            res.statusCode = 422;
            res.send(err);
        }
    });
}

module.exports = imgUploadCloud;