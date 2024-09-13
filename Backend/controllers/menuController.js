const Menu = require('../models/MenuModel');

// Get all menu items for a specific restaurant
const getMenuItemsByRestaurant = async (req, res) => {
    try {
        const menuItems = await Menu.find({ restaurantId: req.params.restaurantId });
        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a specific menu item by ID
const getMenuItemById = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add a new menu item
const addMenuItem = async (req, res) => {
    const { name, price, category, picture, description, deliveryTime, deliveryCost, restaurantId, tags } = req.body;
    try {
        const newMenuItem = new Menu({ name, price, category, picture, description, deliveryTime, deliveryCost, restaurantId, tags });
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a menu item
const updateMenuItem = async (req, res) => {
    const { name, price, category, picture, description, deliveryTime, deliveryCost, tags } = req.body;
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            menuItem.name = name || menuItem.name;
            menuItem.price = price || menuItem.price;
            menuItem.category = category || menuItem.category;
            menuItem.picture = picture || menuItem.picture;
            menuItem.description = description || menuItem.description;
            menuItem.deliveryTime = deliveryTime || menuItem.deliveryTime;
            menuItem.deliveryCost = deliveryCost || menuItem.deliveryCost;
            menuItem.tags = tags || menuItem.tags;
            await menuItem.save();
            res.json(menuItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a menu item
const deleteMenuItem = async (req, res) => {
    try {
        const menuItem = await Menu.findById(req.params.id);
        if (menuItem) {
            await menuItem.remove();
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getMenuItemsByRestaurant,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
};
