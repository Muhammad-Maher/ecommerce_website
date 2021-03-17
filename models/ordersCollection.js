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

    total: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Order = mongoose.model('Order', schema);
module.exports = Order;