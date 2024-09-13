import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import menuReducer from './slices/menuSlice';
import restaurantReducer from './slices/restaurantSlice';
import trendingReducer from './slices/trendingSlice';
import recommendationReducer from './slices/recommendationSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        menu: menuReducer,
        restaurant: restaurantReducer,
        trending: trendingReducer,
        recommendation: recommendationReducer,
    },
});

export default store;
