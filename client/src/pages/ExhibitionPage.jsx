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
    return <div className="container mx-auto mt-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">Events</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {events.map((event) => (
          <div key={event.id} className="bg-gray-100 p-6 rounded-lg shadow-lg">
            <img
              src={event.image_url || "https://via.placeholder.com/300"} // Fallback image if image_url is not available
              alt={event.title}
              className="w-full h-64 object-cover rounded-md mb-4"
            />
            <h3 className="text-2xl font-bold mb-2">{event.title}</h3>
            <p className="text-gray-700 mb-4">{event.short_description}</p>
            <p>
              <strong>Date:</strong> {event.date_display}
            </p>
            <p>
              <strong>Location:</strong> {event.location}
            </p>
            <p>
              <strong>Time:</strong> {event.start_time} - {event.end_time}
            </p>
            {event.is_registration_required && event.rsvp_link && (
              <a
                href={event.rsvp_link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block"
              ></a>
            )}
            <a
              href={event.api_link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mt-4 block"
            >
              More Details
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
