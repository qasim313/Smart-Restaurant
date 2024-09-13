// src/components/Menu/MenuList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMenuItems } from '../../redux/slices/menuSlice';
import MenuItem from './MenuItem';
import Spinner from '../Common/Spinner';

const MenuList = () => {
    const dispatch = useDispatch();
    const menuItems = useSelector((state) => state.menu.menuItems);
    const error = useSelector((state) => state.menu.error);

    useEffect(() => {
        dispatch(fetchMenuItems());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!menuItems.length) {
        return <Spinner />;
    }

    return (
        <div>
            <h2>Menu</h2>
            <div>
                {menuItems.map((item) => (
                    <MenuItem key={item.id} item={item} />
                ))}
            </div>
        </div>
    );
};

export default MenuList;
