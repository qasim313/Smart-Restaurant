// src/components/Menu/MenuItem.js
import React from 'react';

const MenuItem = ({ item }) => {
    return (
        <div className="menu-item">
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
        </div>
    );
};

export default MenuItem;
