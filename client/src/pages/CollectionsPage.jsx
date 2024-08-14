import React, { useState, useEffect } from "react";
import axios from "axios";

const CollectionsPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?page=4"
        );
        // Filter artworks to only include those with images
        const artworksWithImages = response.data.data.filter(
          (artwork) => artwork.image_id
        );
        setArtworks(artworksWithImages); // Set the filtered data to the artworks state
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtworks();
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Artworks Collection</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-gray-100 p-4 rounded-lg shadow-md"
          >
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
            <p className="text-gray-700 mb-4">{artwork.artist_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
