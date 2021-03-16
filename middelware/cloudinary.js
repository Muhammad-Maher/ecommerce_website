const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
})

imgUploadCloud = async(req, pahtInCloud) => {

    const imageName = await req.file.originalname.split(".")
    await imageName.pop()
    await imageName.join()
    const uniqueSuffix = '-' + Date.now() + '-' + Math.round(Math.random() * 1E9);

    return cloudinary.uploader.upload(req.file.path, { public_id: "store/" + pahtInCloud + imageName + uniqueSuffix, width: 100, height: 100, crop: "fill" }, async(error, result) => {
        try {

        } catch (error) {
            res.statusCode = 422;
            res.send(err);
        }
    });
}

module.exports = imgUploadCloud;