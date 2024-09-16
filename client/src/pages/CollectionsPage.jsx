import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const colorCustomRed = "#BB4430";

const CollectionsPage = () => {
  const [artworks, setArtworks] = useState([]);
  const [filteredArtworks, setFilteredArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?page=4"
        );
        const artworksWithImages = response.data.data.filter(
          (artwork) => artwork.image_id
        );
        setArtworks(artworksWithImages);
        setFilteredArtworks(artworksWithImages);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  useEffect(() => {
    const results = artworks.filter((artwork) =>
      artwork.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredArtworks(results);
  }, [searchQuery, artworks]);

  const handleArtworkClick = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleOverlayClick = () => {
    setSelectedArtwork(null);
  };

  const handleDetailsButtonClick = (artwork) => {
    navigate(`/collections-details/${artwork.id}`, { state: { artwork } });
  };

  if (loading) {
    return (
      <div
        style={{ color: colorCustomRed }}
        className="container text-2xl font-bold mx-auto mt-8"
      >
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col justify-between bg-white">
      {/* Header Section */}
      <div className="flex flex-col items-center">
        <div className="text-center text-[#2a3d45] text-[60px] sm:text-[90px] font-normal font-['Work Sans'] mx-auto">EXPLORE</div>
        <div className="text-center text-[#2a3d45] text-[60px] sm:text-[90px] font-normal font-['Work Sans'] mx-auto mb-10">ART</div>
      </div>

      {/* Search and Artworks Section */}
      <div className="container mx-auto my-10 p-6 rounded-lg">
        <input
          type="text"
          placeholder="Search artworks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="input input-bordered w-full mb-6 border-2 border-[#22333b] p-2"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-10">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="flex flex-col items-center p-4 rounded-[40px] border-2 border-[#22333b] cursor-pointer"
              onClick={() => handleArtworkClick(artwork)}
            >
              <img
                src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                alt={artwork.title}
                className="w-full max-w-[412px] h-[469px] rounded-tl-[30px] rounded-tr-[30px] border border-[#22333b] object-cover mb-4"
              />
              <h3 className="text-[18px] sm:text-[25px] text-center text-[#2a3d45] font-medium font-['Work Sans']">{artwork.title}</h3>
              <p className="text-[18px] sm:text-[25px] text-center text-[#2a3d45] font-medium font-['Work Sans']">{artwork.artist_title}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Section */}
      {selectedArtwork && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div
            className="relative p-6 rounded-lg shadow-lg"
            style={{ backgroundColor: colorCustomRed }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={`https://www.artic.edu/iiif/2/${selectedArtwork.image_id}/full/843,/0/default.jpg`}
              alt={selectedArtwork.title}
              className="w-full max-w-lg rounded-lg border-4 border-white"
            />
            <h3 className="text-3xl text-white text-center font-bold mb-2">
              {selectedArtwork.title}
            </h3>
            <p className="text-white text-xl text-center mb-4">
              {selectedArtwork.artist_title}
            </p>
            <button
              className="absolute top-2 right-2 p-2 bg-white text-custom-red rounded-full"
              style={{ color: colorCustomRed }}
              onClick={handleOverlayClick}
            >
              Close
            </button>
            <button
              className="mt-4 p-2 bg-white text-custom-red rounded-full w-full"
              style={{ color: colorCustomRed }}
              onClick={() => handleDetailsButtonClick(selectedArtwork)}
            >
              View Details
            </button>
          </div>
        </div>
      )}

      {/* Footer Section */}
      
    </div>
  );
};

export default CollectionsPage;
