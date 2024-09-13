// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { loginUser, registerUser, getUserProfile, updateUserProfile } from '../../services/api';

// Async thunk to handle login
export const login = createAsyncThunk('auth/login', async ({ email, password }, { rejectWithValue }) => {
    try {
        const response = await loginUser(email, password); // Use the loginUser function from api.js
        localStorage.setItem('token', response.data.token); // Store JWT token
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Async thunk to handle user registration
export const register = createAsyncThunk('auth/register', async ({ username, email, password, role }, { rejectWithValue }) => {
    try {
        const response = await registerUser({ username, email, password, role }); // Use the registerUser function from api.js
        localStorage.setItem('token', response.data.token); // Store JWT token
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Async thunk to fetch user profile
export const fetchProfile = createAsyncThunk('auth/fetchProfile', async (_, { rejectWithValue }) => {
    try {
        const response = await getUserProfile(); // Use the getUserProfile function from api.js
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Async thunk to update user profile
export const updateProfile = createAsyncThunk('auth/updateProfile', async (userData, { rejectWithValue }) => {
    try {
        const response = await updateUserProfile(userData); // Use the updateUserProfile function from api.js
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response ? error.response.data.message : error.message);
    }
});

// Async thunk to handle logout
export const logout = createAsyncThunk('auth/logout', async () => {
    localStorage.removeItem('token'); // Remove JWT token
    return null;
});

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isAuthenticated: false,
        user: null,
        token: localStorage.getItem('token') || null,
        error: null,
    },
    reducers: {
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetAuthState: (state) => {
            state.isAuthenticated = false;
            state.user = null;
            state.token = null;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.payload;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload.user;
                state.token = action.payload.token;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = action.payload;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.user = null;
                state.error = action.payload;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.user = action.payload;
                state.error = null;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.payload;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isAuthenticated = false;
                state.user = null;
                state.token = null;
                state.error = null;
            });
    },
});

export const { setError, resetAuthState } = authSlice.actions;

export default authSlice.reducer;
