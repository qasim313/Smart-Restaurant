// src/components/Restaurant/RestaurantList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRestaurants } from '../../redux/slices/restaurantSlice';
import RestaurantCard from './RestaurantCard';
import Spinner from '../Common/Spinner';

const RestaurantList = () => {
    const dispatch = useDispatch();
    const restaurants = useSelector((state) => state.restaurant.restaurants);
    const error = useSelector((state) => state.restaurant.error);

    useEffect(() => {
        dispatch(fetchRestaurants());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!restaurants.length) {
        return <Spinner />;
    }

    return (
        <div>
            <h2>Restaurants</h2>
            <div>
                {restaurants.map((restaurant) => (
                    <RestaurantCard key={restaurant.id} restaurant={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
