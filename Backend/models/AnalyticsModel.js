const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: false
    },
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: false
    },
    action: {
        type: String,
        enum: ['view', 'add_to_cart', 'order', 'favorite', 'remove_from_cart', 'review'],
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    },
    details: {
        type: String,
        trim: true,
        default: ''  // Any additional details about the action
    }
}, {
    timestamps: true
});

const Analytics = mongoose.model('Analytics', analyticsSchema);
