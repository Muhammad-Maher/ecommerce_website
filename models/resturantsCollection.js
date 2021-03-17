const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Brand = require('./brandsCollection')

const schema = new Schema({
    Name: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    img: {
        type: String,
    },
    address: {
        type: String,
    },
    Mobile: {
        type: String,
        required: true,
    },
    BrandID: {
        type: Schema.Types.ObjectId,
        ref: Brand,
        required: true
    },
    worrkingHours: {
        type: String,
    },
    HotLine: {
        type: String,
    },
    locattion: {
        type: String
    }

});

const Resturant = mongoose.model('Resturant', schema);
module.exports = Resturant;