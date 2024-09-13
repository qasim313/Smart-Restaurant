// src/redux/slices/trendingSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchTrendingItems = createAsyncThunk('trending/fetchTrendingItems', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/trending/items');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const trendingSlice = createSlice({
    name: 'trending',
    initialState: {
        trendingItems: [],
        error: null,
    },
    reducers: {
        clearTrendingItems: (state) => {
            state.trendingItems = [];
        },
        setTrendingError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTrendingItems.fulfilled, (state, action) => {
                state.trendingItems = action.payload;
                state.error = null;
            })
            .addCase(fetchTrendingItems.rejected, (state, action) => {
                state.trendingItems = [];
                state.error = action.payload;
            });
    },
});

export const { clearTrendingItems, setTrendingError } = trendingSlice.actions;

export default trendingSlice.reducer;
