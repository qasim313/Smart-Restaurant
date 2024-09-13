const Restaurant = require('../models/ResturantModel');

// Get all restaurants
const getAllRestaurants = async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.json(restaurants);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific restaurant by ID
const getRestaurantById = async (req, res) => {
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new restaurant
const addRestaurant = async (req, res) => {
    const { name, description, location, contact, rating, ownerId, deliveryAvailable, cuisine } = req.body;
    try {
        const newRestaurant = new Restaurant({ name, description, location, contact, rating, ownerId, deliveryAvailable, cuisine });
        await newRestaurant.save();
        res.status(201).json(newRestaurant);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update restaurant details
const updateRestaurant = async (req, res) => {
    const { name, description, location, contact, deliveryAvailable, cuisine } = req.body;
    try {
        const restaurant = await Restaurant.findById(req.params.id);
        if (restaurant) {
            restaurant.name = name || restaurant.name;
            restaurant.description = description || restaurant.description;
            restaurant.location = location || restaurant.location;
            restaurant.contact = contact || restaurant.contact;
            restaurant.deliveryAvailable = deliveryAvailable || restaurant.deliveryAvailable;
            restaurant.cuisine = cuisine || restaurant.cuisine;
            await restaurant.save();
            res.json(restaurant);
        } else {
            res.status(404).json({ message: 'Restaurant not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getAllRestaurants,
    getRestaurantById,
    addRestaurant,
    updateRestaurant,
};
