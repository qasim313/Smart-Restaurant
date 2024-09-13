// src/redux/slices/menuSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchMenuItems = createAsyncThunk('menu/fetchMenuItems', async (_, { rejectWithValue }) => {
    try {
        const response = await api.get('/menus');
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.message);
    }
});

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menuItems: [],
        error: null,
    },
    reducers: {
        clearMenuItems: (state) => {
            state.menuItems = [];
        },
        setMenuError: (state, action) => {
            state.error = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenuItems.fulfilled, (state, action) => {
                state.menuItems = action.payload;
                state.error = null;
            })
            .addCase(fetchMenuItems.rejected, (state, action) => {
                state.menuItems = [];
                state.error = action.payload;
            });
    },
});

export const { clearMenuItems, setMenuError } = menuSlice.actions;

export default menuSlice.reducer;
