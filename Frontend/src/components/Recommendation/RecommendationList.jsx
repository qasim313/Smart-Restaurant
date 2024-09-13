// src/components/Recommendation/RecommendationList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecommendations } from '../../redux/slices/recommendationSlice';
import Spinner from '../Common/Spinner';

const RecommendationList = () => {
    const dispatch = useDispatch();
    const recommendations = useSelector((state) => state.recommendation.recommendations);
    const error = useSelector((state) => state.recommendation.error);

    useEffect(() => {
        dispatch(fetchRecommendations());
    }, [dispatch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!recommendations.length) {
        return <Spinner />;
    }

    return (
        <div>
            <h2>Recommended for You</h2>
            <ul>
                {recommendations.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default RecommendationList;
