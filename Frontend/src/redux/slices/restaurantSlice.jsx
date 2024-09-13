// src/redux/slices/restaurantSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

// Async thunk to fetch restaurant data
export const fetchRestaurants = createAsyncThunk(
    'restaurant/fetchRestaurants',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/restaurants'); // Fetching from the restaurants endpoint
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const restaurantSlice = createSlice({
    name: 'restaurant',
    initialState: {
        restaurants: [],
        error: null,
    },
    reducers: {
        clearRestaurants: (state) => {
            state.restaurants = [];
        },
        setRestaurantError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRestaurants.pending, (state) => {
                state.error = null; // Clear any previous error when fetching starts
            })
            .addCase(fetchRestaurants.fulfilled, (state, action) => {
                state.restaurants = action.payload; // Update state with fetched data
                state.error = null; // Clear error on successful fetch
            })
            .addCase(fetchRestaurants.rejected, (state, action) => {
                state.restaurants = []; // Clear restaurants on fetch failure
                state.error = action.payload; // Set error message
            });
    },
});

// Exporting the synchronous actions for use in components
export const { clearRestaurants, setRestaurantError } = restaurantSlice.actions;

// Exporting the reducer to be included in the store
export default restaurantSlice.reducer;
