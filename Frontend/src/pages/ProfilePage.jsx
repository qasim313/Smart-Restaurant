// src/pages/ProfilePage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfile } from '../redux/slices/authSlice';
import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

const ProfilePage = () => {
    const dispatch = useDispatch();
    const { user, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            dispatch(fetchProfile());
        }
    }, [dispatch, user]);

    return (
        <div>
            <Header />
            <main style={{ padding: '20px' }}>
                <h1>My Profile</h1>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {user ? (
                    <div>
                        <div>
                            <strong>Username:</strong> {user.username}
                        </div>
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                        {user.phone && (
                            <div>
                                <strong>Phone:</strong> {user.phone}
                            </div>
                        )}
                        {user.address && (
                            <div>
                                <strong>Address:</strong>
                                <div>{user.address.street}</div>
                                <div>{user.address.city}, {user.address.zip}</div>
                                <div>{user.address.country}</div>
                            </div>
                        )}
                        {user.preferences && user.preferences.length > 0 && (
                            <div>
                                <strong>Preferences:</strong> {user.preferences.join(', ')}
                            </div>
                        )}
                    </div>
                ) : (
                    <p>Loading profile...</p>
                )}
            </main>
            <Footer />
        </div>
    );
};

export default ProfilePage;
