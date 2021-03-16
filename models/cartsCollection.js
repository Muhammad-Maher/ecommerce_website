const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productID: [{
        type: Schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Cart = mongoose.model('cart', schema);
module.exports = Cart;