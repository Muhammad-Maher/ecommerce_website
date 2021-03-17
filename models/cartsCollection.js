const mongoose = require('mongoose');
const Schema = mongoose.Schema
const Product = require('./productsCollection')
const User = require('./usersCollection')
const schema = new Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: User,
        required: true
    },
    productID: [{
        type: Schema.Types.ObjectId,
        ref: Product
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Cart = mongoose.model('Cart', schema);
module.exports = Cart;