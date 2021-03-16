const multer = require("multer");
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + file.originalname)
    }
})




const filters = (req, file, cb) => {


    // const filter = ['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype);
    const filter = file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/);

    if (filter)
        cb(null, true)
    else
        cb(null, false)


};

const upload = multer({ storage: storage, fileFilter: filters })

module.exports = upload;