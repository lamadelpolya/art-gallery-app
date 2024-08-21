import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const colorCustomRed = "#BB4430";

const DetailsCollectionPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [artwork, setArtwork] = useState(location.state?.artwork || null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    if (!artwork) {
      const fetchArtwork = async () => {
        try {
          const response = await axios.get(
            `https://api.artic.edu/api/v1/artworks/${id}`
          );
          setArtwork(response.data.data);
        } catch (error) {
          console.error("Error fetching artwork:", error);
        }
      };

      fetchArtwork();
    }
  }, [artwork, id]);

  const handleShareClick = () => {
    const url = window.location.href;
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowTooltip(true);
        setTimeout(() => {
          setShowTooltip(false);
        }, 2000); // Ocultar la burbuja después de 2 segundos
      })
      .catch((error) => {
        console.error("Error copying link to clipboard", error);
      });
  };

  if (!artwork) {
    return (
      <div
        style={{ color: colorCustomRed }}
        className="container text-2xl font-bold mx-auto mt-8"
      >
        No artwork selected.
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <img
        src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
        alt={artwork.title}
        className="w-full max-w-lg mx-auto rounded-lg border-4 border-white"
      />
      <h1
        className="text-3xl text-center font-bold mt-4"
        style={{ color: colorCustomRed }}
      >
        {artwork.title}
      </h1>
      <p className="text-xl text-center mt-2" style={{ color: colorCustomRed }}>
        {artwork.artist_title}
      </p>
      <p className="text-lg text-center mt-2" style={{ color: colorCustomRed }}>
        {artwork.date_display}
      </p>
      <p className="text-lg text-center mt-2" style={{ color: colorCustomRed }}>
        {artwork.medium_display}
      </p>
      <p className="text-lg text-center mt-2" style={{ color: colorCustomRed }}>
        {artwork.dimensions}
      </p>

      <div className="text-center mt-6 relative">
        <button
          onClick={handleShareClick}
          className="p-2 bg-custom-red text-white rounded-full"
          style={{ backgroundColor: colorCustomRed }}
        >
          Share
        </button>
        {showTooltip && (
          <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-full bg-black text-white text-xs rounded p-2 mt-2">
            Link copied!
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailsCollectionPage;
