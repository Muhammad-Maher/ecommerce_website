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

const Order = mongoose.model('order', schema);
module.exports = Order;