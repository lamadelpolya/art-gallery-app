import { Link } from 'react-router-dom';
import React, { useEffect, useState } from "react";
import axios from "axios";
import ArtistSubmissionForm from '../components/artworks/ArtistSubmissionForm'; // Import the form component

const UserDashboard = () => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/artworks", {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setArtworks(response.data);
      } catch (error) {
        console.error("Error fetching artworks:", error);
      }
    };

    fetchArtworks();
  }, []);

  const handleAddArtwork = (newArtworks) => {
    setArtworks((prevArtworks) => [...prevArtworks, ...newArtworks]);
  };

  return (
    <div className="container border-8 border-pallette-1 mx-auto my-10 p-6 bg-white rounded-2xl shadow-md">
      <h1 className="text-6xl text-center text-pallette-1 font-bold mb-8">My Dashboard</h1>

      <section className="mb-12">
        <h2 className="text-3xl text-pallette-1 font-bold mb-4">My Artworks</h2>
        <p className="text-xl text-pallette-1 mb-4">
          Manage your collection of artworks. You can view, edit, or delete your existing artworks or add new ones.
        </p>
        <div className="flex justify-center mt-4">
          <Link to="/submit-art" className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4">
            Submit New Artwork
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {artworks.map((artwork) => (
            <div key={artwork._id} className="border border-gray-300 p-4 rounded-lg">
              <h3 className="text-2xl font-semibold">{artwork.title}</h3>
              <p className="text-gray-600">{artwork.description}</p>
              {artwork.image && <img src={artwork.image} alt={artwork.title} className="mt-2 rounded-lg" />}
            </div>
          ))}
        </div>
      </section>

      {/* Add the ArtistSubmissionForm and pass handleAddArtwork as a prop */}

      <section className="mb-12">
        <h2 className="text-3xl text-pallette-1 font-bold mb-4">My Collections</h2>
        <p className="text-xl text-pallette-1 mb-4">
          Organize your artworks into collections. You can create new collections or manage your existing ones.
        </p>
        <div className="flex justify-center mt-4">
          <Link to="/collections" className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4">
            Manage My Collections
          </Link>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl text-pallette-1 font-bold mb-4">Profile Settings</h2>
        <p className="text-xl text-pallette-1 mb-4">
          Update your personal information and manage your account settings.
        </p>
        <div className="flex justify-center mt-4">
          <Link to="/profile" className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4">
            Back to Profile
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UserDashboard;
