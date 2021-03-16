const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    Name: {
        type: String,
        required: true,
        unique: true
    },
    img: {
        type: String,
    },
    Description: {
        type: String
    },
    contactNo: {
        type: String
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    Password: {
        type: String,
        required: true,
    }
});

const Brand = mongoose.model('brand', schema);
module.exports = Brand;