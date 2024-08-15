import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";


function MainPage() {
  const [artworks, setArtworks] = useState([]);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get(
          "https://api.artic.edu/api/v1/artworks?page=6"
        );
        return response.data.data;
      } catch (error) {
        console.error("Error fetching artworks from API:", error);
        return [];
      }
    };

    const fetchEvents = async () => {
      try {
        const response = await axios.get("https://api.artic.edu/api/v1/events");
        return response.data.data;
      } catch (error) {
        console.error("Error fetching events:", error);
        return [];
      }
    };

    const fetchAllData = async () => {
      setLoading(true);
      try {
        const [fetchedArtworks, fetchedEvents] = await Promise.all([
          fetchArtworks(),
          fetchEvents(),
        ]);
        setArtworks(fetchedArtworks);
        setEvents(fetchedEvents);
      } catch (error) {
        setError("Failed to load content. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="container bg-white mx-auto mt-8">
      
      <div
        className="hero-section rounded-3xl bg-cover  bg-center text-white h-max py-32 px-2"
        style={{
          backgroundImage: `url('https://www.artic.edu/iiif/2/${artworks[5]?.image_id}/full/843,/0/default.jpg')`,
        }}
      >
        <div className="max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold mb-4">
            Discover Art Like Never Before
          </h1>
          <p className="text-2xl mb-8">
            Explore our curated collections, upcoming events, and a rich archive
            of artworks.
          </p>
        </div>
      </div>

      {/* Featured Artwork Section */}
      <section className="featured  py-16 px-4">
        <div className="max-w-screen mx-auto">
          <h2 className="text-4xl text-white text-center font-bold mb-8">
            
            Featured Artwork
          </h2>
          <div className="grid grid-cols-1 w-full md:grid-cols-2 gap-8">
            <div className="bg-white h-screen text-pallette-1 p-6 rounded-lg shadow-lg">
              <img
                src={`https://www.artic.edu/iiif/2/${artworks[6]?.image_id}/full/843,/0/default.jpg`}
                alt={artworks[0]?.title}
                className="w-full h-96 object-cover text-pallette-1 rounded-lg mb-6"
              />
              <h3 className="text-2xl font-bold mb-4">{artworks[0]?.title}</h3>
              <p className="text-xl text-pallette-1 font-semibold mb-4">
                {artworks[0]?.artist_display}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              {artworks.slice(0, 4).map((artwork) => (
                <div
                  key={artwork.id}
                  className="bg-white text-pallette-1 p-4 rounded-lg shadow-lg"
                >
                  <img
                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                    alt={artwork.title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <h3 className="text-xl font-bold mb-2">{artwork.title}</h3>
                  <p className="text-pallette-1 font-semibold">
                    {artwork.artist_display}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Collections Section */}
      <section className="collections-section rounded-3xl py-16 bg-[#BB4430] px-4">
        <div className="max-w-5xl   mx-auto">
        <Link
            to="/collections"
            className="inline-block w-[300px] h-[80px] border-2 border-white rounded-[60px] text-white text-4xl hover:bg-gray-700 font-bold mb-8"
          >
            <div className="flex items-center justify-center h-full">
              Our Collections
            </div>
          </Link>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {artworks.slice(5, 9).map((artwork) => (
              <div
                key={artwork.id}
                className="bg-white p-6 rounded-3xl shadow-lg"
              >
                <img
                  src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                  alt={artwork.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl text-pallette-1 font-bold mb-4">{artwork.title}</h3>
                <p className="text-lg text-pallette-1 mb-4">
                  {artwork.artist_display}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="events-section py-16 px-4">
        <div className="max-w-screen mx-auto">
          <h2 className="text-4xl text-wh font-bold mb-8">
            Upcoming Events
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {events.map((event) => (
              <div key={event.id} className="bg-[#BB4430] p-6 rounded-3xl shadow-lg">
                <img
                  src={event.image_url || "https://via.placeholder.com/600x400"}
                  alt={event.title}
                  className="w-full h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-2xl text-white font-bold mb-4">{event.title}</h3>
                <p className="text-lg text-white mb-4">
                  {event.short_description}
                </p>
                <p className="text-white mb-4">
                  <strong>Date:</strong> {event.date_display}
                </p>
                <a
                  href={event.api_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:underline"
                >
                  More Details
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;
