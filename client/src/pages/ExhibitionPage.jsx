import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExhibitionsPage = () => {
  const [exhibitions, setExhibitions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExhibitions = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/exhibitions');
        setExhibitions(response.data);
      } catch (error) {
        console.error('Error fetching exhibitions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchExhibitions();
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Exhibitions</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {exhibitions.map((exhibition) => (
          <div key={exhibition._id} className="bg-gray-100 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-2">{exhibition.title}</h3>
            <p className="text-gray-700 mb-4">{exhibition.description}</p>
            <p><strong>Date:</strong> {new Date(exhibition.date).toLocaleDateString()}</p>
            <p><strong>Location:</strong> {exhibition.location}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExhibitionsPage;
