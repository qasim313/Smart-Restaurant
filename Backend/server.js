// server.js or app.js
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const http = require('http');
const socketIo = require('socket.io');

// Load environment variables
dotenv.config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const restaurantRoutes = require('./routes/restaurantRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const trendingRoutes = require('./routes/trendingRoutes');

// Connect to MongoDB
const connectDB = require('./config/db');
connectDB();

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/restaurants', restaurantRoutes);
app.use('/api/menus', menuRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/trending', trendingRoutes);

// Error handling middleware
app.use(require('./middleware/errorMiddleware'));

// Start server
const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
const io = socketIo(server);

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

// Socket.io integration
io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('disconnect', () => {
        console.log('Client disconnected');
    });
});
