import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
    const [message, setMessage] = useState('');

    useEffect(() => {
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        axios.get(`${apiUrl}/`)
            .then(response => {
                setMessage(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded shadow-md text-center">
                <h1 className="text-2xl font-bold mb-4">
                    Welcome to the MERN Stack with Vite</h1>
                <p className="text-gray-700">{message}</p>
            </div>
        </div>
    );
}

export default App;
