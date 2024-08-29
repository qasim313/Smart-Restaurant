const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        enum: ['customer', 'owner'],
        required: true,
        default: 'customer'
    },
    favorites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    cart: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu'
        },
        quantity: {
            type: Number,
            required: true,
            default: 1
        }
    }],
    orders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order'
    }],
    address: {
        street: String,
        city: String,
        zip: String,
        country: String
    },
    phone: {
        type: String,
        trim: true,
        default: ''
    },
    preferences: [{
        type: String, // E.g., "spicy", "vegan"
        trim: true
    }]
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);
