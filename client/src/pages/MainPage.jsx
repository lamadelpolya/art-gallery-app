import React, { useEffect, useState } from 'react';
import ArtworkCard from '../components/artworks/ArtworkCard';
import { getArtsyToken } from '../api/api';
import axios from 'axios';

function MainPage() {
    const [artworks, setArtworks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArtworks = async () => {
            try {
                // Get the Artsy API token
                const token = await getArtsyToken();

                // Fetch artworks using the token
                const artworksResponse = await axios.get('https://api.artsy.net/api/art', {
                    headers: {
                        'X-Xapp-Token': token,
                    },
                });

                setArtworks(artworksResponse.data._embedded.artworks);
            } catch (error) {
                console.error('Error fetching artworks:', error);
                setError('Failed to load artworks. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, []);

    if (loading) {
        return <div className="container mx-auto mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">Featured Artworks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {artworks.map(artwork => (
                    <ArtworkCard key={artwork.id} artwork={artwork} />
                ))}
            </div>
        </div>
    );
}

export default MainPage;
