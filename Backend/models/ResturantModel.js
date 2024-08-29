const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    contact: {
        type: String,
        required: true,
        trim: true
    },
    rating: {
        type: Number,
        default: 0,
        min: 0,
        max: 5
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    deliveryAvailable: {
        type: Boolean,
        required: true
    },
    cuisine: {
        type: String,
        trim: true
    },
    openingHours: {
        monday: { open: String, close: String },
        tuesday: { open: String, close: String },
        // and so on for each day
    },
    popularityScore: {
        type: Number,
        default: 0  // Initialize popularity score to 0
    }
}, {
    timestamps: true
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
