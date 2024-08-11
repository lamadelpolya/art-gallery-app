// src/pages/MainPage.jsx
import React, { useEffect, useState } from 'react';
import ArtworkCard from '../components/artworks/ArtworkCard';
import axios from 'axios';

function MainPage() {
    const [artworks, setArtworks] = useState([]);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                const response = await axios.get('http://localhost:5005/api/artworks');
                setArtworks(response.data);
            } catch (error) {
                console.error('Error fetching artworks:', error);
            }
        };

        fetchArtworks();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">Featured Artworks</h2>
            <div className="grid grid-cols-3 gap-4">
                {artworks.map(artwork => (
                    <ArtworkCard key={artwork._id} artwork={artwork} />
                ))}
            </div>
        </div>
    );
}

export default MainPage;
