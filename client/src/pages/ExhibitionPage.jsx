import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Estado para el término de búsqueda
  const [showTooltip, setShowTooltip] = useState(false);
  const modalRef = useRef(null);
  const navigate = useNavigate();

  const colorCustomRed = "#d9534f";

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.artic.edu/api/v1/events");
        setEvents(response.data.data); // Ajustar para acceder correctamente al array de datos
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setSelectedEvent(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  if (loading) {
    return (
      <div className="container text-pallette-1 text-2xl font-bold mx-auto mt-8">
        Loading...
      </div>
    );
  }

  const overlayStyle = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    background: "rgba(0, 0, 0, 0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1000,
  };

  const modalContentStyle = {
    background: "#d9534f",
    borderRadius: "1rem",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    width: "80%",
    maxWidth: "800px",
    padding: "2rem",
    position: "relative",
    zIndex: 1010,
    color: "white",
    overflow: "hidden",
  };

  const imageStyle = {
    width: "100%",
    height: "auto",
    objectFit: "contain",
  };

  const cardStyle = {
    transition: "transform 0.3s ease",
  };

  const cardHoverStyle = {
    transform: "scale(1.05)",
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-6xl font-bold mb-6 text-center text-pallette-1">
        Exhibitions
      </h1>
      <input
        type="text"
        className="input input-bordered mb-4"
        placeholder="Search exhibitions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            style={cardStyle}
            className="bg-pallette-2 p-4 rounded-3xl shadow-md cursor-pointer"
            onClick={() => setSelectedEvent(event)}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = cardHoverStyle.transform)
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "")}
          >
            <img
              src={event.image_url || "https://via.placeholder.com/300"}
              alt={event.title}
              className="w-full h-64 object-cover rounded-xl border-8 border-white mb-4"
            />
            <h3 className="text-2xl text-white text-center font-bold mb-2">
              {event.title}
            </h3>
          </div>
        ))}
      </div>

      {selectedEvent && (
        <div style={overlayStyle}>
          <div style={modalContentStyle} ref={modalRef}>
            <img
              src={selectedEvent.image_url || "https://via.placeholder.com/300"}
              alt={selectedEvent.title}
              style={imageStyle}
            />
            <h3 className="text-2xl text-white text-center font-bold mb-2">
              {selectedEvent.title}
            </h3>
            <p className="text-white text-xl text-center mb-4">
              {selectedEvent.short_description}
            </p>
            <p className="text-white text-lg text-center mb-2">
              <strong>Date:</strong> {selectedEvent.date_display}
            </p>
            <p className="text-white text-lg text-center mb-2">
              <strong>Location:</strong> {selectedEvent.location}
            </p>
            <p className="text-white text-lg text-center mb-4">
              <strong>Time:</strong> {selectedEvent.start_time} -{" "}
              {selectedEvent.end_time}
            </p>
            <button
              onClick={() =>
                navigate(`/exhibition-details/${selectedEvent.id}`)
              }
              className="bg-white text-pallette-2 p-2 rounded-full mt-4"
            >
              View Details
            </button>
            <button
              onClick={handleShareClick}
              className="absolute top-2 right-2 p-2 bg-white text-custom-red rounded-full"
              style={{ color: colorCustomRed }}
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
      )}
    </div>
  );
};

export default EventsPage;
