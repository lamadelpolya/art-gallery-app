import React, { useState } from 'react';
import axios from 'axios';
import ArtworkCard from '../components/artworks/ArtworkCard';

const SearchResultsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [artist, setArtist] = useState('');
  const [medium, setMedium] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5005/api/search', {
        params: { query: searchQuery, artist, medium, priceRange }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        <input
          type="text"
          placeholder="Artist"
          value={artist}
          onChange={(e) => setArtist(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />
        
      </div>
      <button onClick={handleSearch} className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4 fy">Search</button>

      {loading && <div>Loading...</div>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {results.map((result) => (
          <ArtworkCard key={result.id || result._id} artwork={result} />
        ))}
      </div>
    </div>
  );
};

export default SearchResultsPage;
