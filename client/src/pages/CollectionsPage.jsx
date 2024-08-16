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
    return <div className="container text-pallette-1 text-2xl font-bold  mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {artworks.map((artwork) => (
          <div
            key={artwork.id}
            className="bg-pallette-2 p-4 rounded-3xl shadow-md"
          >
            <img
              src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
              alt={artwork.title}
              className="w-full  object-cover rounded-xl border-8 border-white mb-4"
            />
            <h3 className="text-2xl text-white text-center font-bold mb-2">{artwork.title}</h3>
            <p className="text-white text-xl text-center mb-4">{artwork.artist_title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionsPage;
