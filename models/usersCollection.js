const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        unique: true
    },
    Password: {
        type: String,
        required: true
    },
    mail: {
        type: String,
        required: true,
        unique: true
    },
    gender: {
        type: String,
    },
    fname: {
        type: String,
        minlength: 3,
        required: true,
    },
    lname: {
        type: String,
        minlength: 3,
    },
    Phone: {
        type: String,
        required: true,
    },
    governorater: {
        type: String,
    },
    Address: {
        type: String
    },
    country: {
        type: String,
    },
    img: {
        type: String,
        optional: true,
    },
    status: {
        type: String,
        enum: ["admin", "user"]
    },
    BrandID: {
        type: Schema.Types.ObjectId,
        ref: 'Brand'
    }
});

const User = mongoose.model('user', schema);
module.exports = User;