import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArtworkCard from '../components/artworks/ArtworkCard';

const SearchResultsPage = ({ searchQuery }) => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const token = await getArtsyToken();
                const response = await axios.get('https://api.artsy.net/api/search', {
                    headers: {
                        'X-Xapp-Token': token,
                    },
                    params: {
                        q: searchQuery,
                    },
                });
                setResults(response.data._embedded.results);
            } catch (error) {
                console.error('Error fetching search results:', error);
                setError('Failed to load search results. Please try again later.');
            } finally {
                setLoading(false);
            }
        };

        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery]);

    if (loading) {
        return <div className="container mx-auto mt-8">Loading...</div>;
    }

    if (error) {
        return <div className="container mx-auto mt-8 text-red-500">{error}</div>;
    }

    return (
        <div className="container mx-auto mt-8">
            <h2 className="text-3xl font-bold mb-4">Search Results for "{searchQuery}"</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {results.map(result => (
                    <ArtworkCard key={result.id} artwork={result} />
                ))}
            </div>
        </div>
    );
};

export default SearchResultsPage;
