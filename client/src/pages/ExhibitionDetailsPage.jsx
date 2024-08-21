import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const colorCustomRed = "#BB4430";

const DetailsPage = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await axios.get(
          `https://api.artic.edu/api/v1/events/${id}`
        );
        setEvent(response.data.data);
      } catch (error) {
        console.error("Error fetching event:", error);
      }
    };
    fetchEvent();
  }, [id]);

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

  if (!event) {
    return (
      <div className="container text-pallette-1 text-2xl font-bold mx-auto mt-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <img
        src={event.image_url || "https://via.placeholder.com/300"}
        alt={event.title}
        className="w-full max-w-lg mx-auto rounded-lg border-4 border-white"
      />
      <h1
        className="text-3xl text-center font-bold mt-4"
        style={{ color: colorCustomRed }}
      >
        {event.title}
      </h1>
      <p className="text-xl text-center mt-2" style={{ color: colorCustomRed }}>
        {event.short_description}
      </p>
      <p className="text-lg text-center mt-2" style={{ color: colorCustomRed }}>
        <strong>Date:</strong> {event.date_display}
      </p>
      <p className="text-lg text-center mt-2" style={{ color: colorCustomRed }}>
        <strong>Location:</strong> {event.location}
      </p>
      <p className="text-lg text-center mt-2" style={{ color: colorCustomRed }}>
        <strong>Time:</strong> {event.start_time} - {event.end_time}
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

export default DetailsPage;
