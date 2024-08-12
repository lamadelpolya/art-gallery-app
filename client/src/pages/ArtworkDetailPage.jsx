import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArtworkDetailPage = () => {
  const { artworkId } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtwork = async () => {
      try {
        const response = await axios.get(`http://localhost:5005/api/artworks/${artworkId}`);
        setArtwork(response.data);
      } catch (error) {
        console.error('Error fetching artwork:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtwork();
  }, [artworkId]);

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  if (!artwork) {
    return <div className="container mx-auto mt-8">Artwork not found.</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">{artwork.title}</h1>
      <img src={artwork.image} alt={artwork.title} className="w-full h-64 object-cover rounded-md mb-4" />
      <p className="text-lg mb-8">{artwork.description}</p>
      <p><strong>Artist:</strong> {artwork.artist.name}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
      <p><strong>Medium:</strong> {artwork.medium}</p>
    </div>
  );
};

export default ArtworkDetailPage;
