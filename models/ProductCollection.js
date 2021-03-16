const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
    Name: {
        type: String,
        required: true,
        unique: false
    },
    img: {
        type: String,
    },
    status: {
        type: String,
        enum: ["sale", "Not Sale"]
    },
    Price: {
        type: Number,
        required: true,
    },
    resturantID: {
        type: Schema.Types.ObjectId,
        ref: 'Resturant',
        required: true
    }
});

const Product = mongoose.model('product', schema);
module.exports = Product;