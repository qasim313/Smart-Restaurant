// src/components/Trending/TrendingList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTrendingItems } from '../../redux/slices/trendingSlice';
import Spinner from '../Common/Spinner';

const TrendingList = () => {
    const dispatch = useDispatch();
    const trendingItems = useSelector((state) => state.trending.trendingItems);
    const error = useSelector((state) => state.trending.error);

    useEffect(() => {
        dispatch(fetchTrendingItems());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!trendingItems.length) {
        return <Spinner />;
    }

    return (
        <div>
            <h2>Trending Now</h2>
            <ul>
                {trendingItems.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default TrendingList;
