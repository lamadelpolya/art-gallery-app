import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CollectionsPage = () => {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCollections = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/collections');
        setCollections(response.data);
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
          <div key={collection._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{collection.title}</h3>
            <p className="text-gray-700 mb-4">{collection.description}</p>
            <Link to={`/collections/${collection._id}`} className="text-blue-500">View Collection</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
