// src/services/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
    baseURL: import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add Authorization header with JWT token for all requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// AUTH API
export const loginUser = (email, password) => api.post('/users/login', { email, password });
export const registerUser = (userData) => api.post('/users/register', userData);
export const getUserProfile = () => api.get('/users/profile'); // Token included automatically
export const updateUserProfile = (userData) => api.put('/users/profile', userData);

// RESTAURANT API
export const fetchRestaurants = () => api.get('/restaurants');
export const addRestaurant = (restaurantData) => api.post('/restaurants', restaurantData);
export const updateRestaurant = (id, restaurantData) => api.put(`/restaurants/${id}`, restaurantData);
export const deleteRestaurant = (id) => api.delete(`/restaurants/${id}`);

// MENU API
export const fetchMenuItems = () => api.get('/menus');
export const addMenuItem = (menuItemData) => api.post('/menus', menuItemData);
export const updateMenuItem = (id, menuItemData) => api.put(`/menus/${id}`, menuItemData);
export const deleteMenuItem = (id) => api.delete(`/menus/${id}`);

// ORDER API
export const placeOrder = (orderData) => api.post('/orders', orderData);
export const fetchUserOrders = (userId) => api.get(`/orders/user/${userId}`);
export const updateOrderStatus = (id, statusData) => api.put(`/orders/${id}`, statusData);

// REVIEW API
export const fetchReviewsForRestaurant = (restaurantId) => api.get(`/reviews/restaurant/${restaurantId}`);
export const fetchReviewsForMenuItem = (menuItemId) => api.get(`/reviews/menu/${menuItemId}`);
export const addReview = (reviewData) => api.post('/reviews', reviewData);
export const deleteReview = (id) => api.delete(`/reviews/${id}`);

// ANALYTICS API
export const recordEvent = (eventData) => api.post('/analytics/event', eventData);
export const getAnalyticsData = () => api.get('/analytics');

// TRENDING API
export const fetchTrendingItems = () => api.get('/trending/items');
export const fetchTrendingRestaurants = () => api.get('/trending/restaurants');

export default api;
