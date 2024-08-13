import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('https://api.artic.edu/api/v1/artworks');
        setCollections(response.data.data); // Adjust to access the data array properly
      } catch (error) {
        console.error('Error fetching collections:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchCollections();
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Collections</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {collections.map((collection) => (
          <div key={collection.id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img 
              src={`https://www.artic.edu/iiif/2/${collection.image_id}/full/843,/0/default.jpg`} 
              alt={collection.title} 
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
            <p className="text-gray-700 mb-4">{collection.artist_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
