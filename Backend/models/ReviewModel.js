const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    restaurantId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant'
    },
    menuItemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    comment: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const Review = mongoose.model('Review', reviewSchema);
