import React, { useState, useEffect } from "react";
import axios from "axios";

const ExhibitionForm = () => {
  const [exhibition, setExhibition] = useState({
    title: "",
    artist: "",
    description: "",
    date: "",
    location: "",
  });

  const [profileArtworks, setProfileArtworks] = useState([]); // State to hold the artworks from the user's profile
  const [selectedArtworks, setSelectedArtworks] = useState([]); // State to hold selected artworks

  useEffect(() => {
    // Fetch artworks from the user's profile when the component mounts
    const fetchProfileArtworks = async () => {
      try {
        const response = await axios.get('http://localhost:5005/api/artworks', {
          headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        setProfileArtworks(response.data);
      } catch (error) {
        console.error('Error fetching profile artworks:', error);
      }
    };

    fetchProfileArtworks();
  }, []);

  const handleExhibitionChange = (e) => {
    const { name, value } = e.target;
    setExhibition({
      ...exhibition,
      [name]: value,
    });
  };

  const handleArtworkSelection = (artworkId) => {
    setSelectedArtworks((prevSelected) =>
      prevSelected.includes(artworkId)
        ? prevSelected.filter((id) => id !== artworkId)
        : [...prevSelected, artworkId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5005/api/exhibitions",
        { ...exhibition, artworks: selectedArtworks },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Exhibition submitted successfully:", response.data);
      alert("Exhibition submitted successfully!");

      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Error submitting exhibition:", error);
      alert("Failed to submit exhibition. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center w-full h-full justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/src/assets/back.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-pallette-1 border-4 border-white p-8 rounded-3xl shadow-lg w-full max-w-xl"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Create a New Exhibition
        </h2>
        <div className="mb-4">
          <label className="block text-xl text-white font-bold mb-2">
            Exhibition Title
          </label>
          <input
            type="text"
            name="title"
            value={exhibition.title}
            onChange={handleExhibitionChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-white font-bold mb-2">
            Description
          </label>
          <textarea
            name="description"
            value={exhibition.description}
            onChange={handleExhibitionChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-white font-bold mb-2">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={exhibition.date}
            onChange={handleExhibitionChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        {/* Artworks Selection Section */}
        <div className="mb-6">
          <h3 className="text-xl text-white font-bold mb-4">Select Artworks from Your Profile</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {profileArtworks.map((artwork) => (
              <div key={artwork._id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={artwork.imageUrl }
                  alt={artwork.title}
                  className="w-full h-40 object-cover rounded-lg mb-4"
                />
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">{artwork.title}</h4>
                  <input
                    type="checkbox"
                    checked={selectedArtworks.includes(artwork._id)}
                    onChange={() => handleArtworkSelection(artwork._id)}
                    className="form-checkbox text-blue-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="submit"
            className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ExhibitionForm;
