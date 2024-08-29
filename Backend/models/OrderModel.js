const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        },
        quantity: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'in-progress', 'delivered', 'cancelled'],
        default: 'pending'
    },
    deliveryAddress: {
        street: String,
        city: String,
        zip: String,
        country: String
    },
    deliveryTime: {
        type: Date
    }
}, {
    timestamps: true
});

const Order = mongoose.model('Order', orderSchema);
