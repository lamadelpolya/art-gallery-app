import React, { useState, useEffect } from "react";
import axios from "axios";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.artic.edu/api/v1/events");
        setEvents(response.data.data); // Adjust to access the data array properly
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  if (loading) {
    return <div className="container text-pallette-1 text-2xl font-bold mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-6xl font-bold mb-6 text-center text-pallette-1">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
        {events.map((event) => (
          <div key={event.id} className="bg-pallette-2 p-4 rounded-3xl shadow-md">
            <img
              src={event.image_url || "https://via.placeholder.com/300"} // Fallback image if image_url is not available
              alt={event.title}
              className="w-full h-64 object-cover rounded-xl border-8 border-white mb-4"
            />
            <h3 className="text-2xl text-white text-center font-bold mb-2">{event.title}</h3>
            <p className="text-white text-xl text-center mb-4">{event.short_description}</p>
            <p className="text-white text-lg text-center mb-2">
              <strong>Date:</strong> {event.date_display}
            </p>
            <p className="text-white text-lg text-center mb-2">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="text-white text-lg text-center mb-4">
              <strong>Time:</strong> {event.start_time} - {event.end_time}
            </p>
           
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
