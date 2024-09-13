// src/components/Restaurant/RestaurantCard.js
import React from 'react';

const RestaurantCard = ({ restaurant }) => {
    return (
        <div className="restaurant-card">
            <h3>{restaurant.name}</h3>
            <p>{restaurant.description}</p>
            <p>Location: {restaurant.location}</p>
        </div>
    );
};

export default RestaurantCard;
