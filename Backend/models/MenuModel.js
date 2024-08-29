const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    deliveryTime: {
        type: Number,
        required: true
    },
    deliveryCost: {
        type: Number,
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true
    },
    tags: [{
        type: String, // E.g., "spicy", "vegan"
        trim: true
    }],
    popularityScore: {
        type: Number,
        default: 0  // Initialize popularity score to 0
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);
