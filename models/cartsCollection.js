const mongoose = require('mongoose');
const Schema = mongoose.Schema

const schema = Schema({
    userID: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    productID: [{
        type: schema.Types.ObjectId,
        ref: 'Product'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
});

const Cart = mongoose.model('order', schema);
module.exports = Cart;