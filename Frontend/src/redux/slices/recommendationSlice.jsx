// src/redux/slices/recommendationSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchRecommendations = createAsyncThunk('recommendation/fetchRecommendations', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/recommendations');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const recommendationSlice = createSlice({
    name: 'recommendation',
    initialState: {
        recommendations: [],
        error: null,
    },
    reducers: {
        resetRecommendations: (state) => {
            state.recommendations = [];
        },
        setRecommendationError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.recommendations = action.payload;
                state.error = null;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.recommendations = [];
                state.error = action.payload;
            });
    },
});

export const { resetRecommendations, setRecommendationError } = recommendationSlice.actions;

export default recommendationSlice.reducer;
