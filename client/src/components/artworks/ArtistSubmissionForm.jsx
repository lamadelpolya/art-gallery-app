import React, { useState } from "react";
import axios from "axios";

const ArtistSubmissionForm = () => {
  const [step, setStep] = useState(1);
  const [artistInfo, setArtistInfo] = useState({
    name: "",
    biography: "",
    email: "",
    phone: "",
  });
  const [artworks, setArtworks] = useState([]);
  const [exhibition, setExhibition] = useState({
    title: "",
    artist: "",
    description: "",
    date: "",
  });

  // Handle artist information input
  const handleArtistInfoChange = (e) => {
    const { name, value } = e.target;
    setArtistInfo({
      ...artistInfo,
      [name]: value,
    });
  };

  // Handle artwork submission
  const handleArtworkChange = (index, e) => {
    const { name, value } = e.target;
    const newArtworks = [...artworks];
    newArtworks[index] = {
      ...newArtworks[index],
      [name]: value,
    };
    setArtworks(newArtworks);
  };

  const handleAddArtwork = () => {
    setArtworks([...artworks, { title: "", description: "", image: "" }]);
  };

  const handleRemoveArtwork = (index) => {
    const newArtworks = artworks.filter((_, i) => i !== index);
    setArtworks(newArtworks);
  };

  // Handle exhibition input
  const handleExhibitionChange = (e) => {
    const { name, value } = e.target;
    setExhibition({
      ...exhibition,
      [name]: value,
    });
  };

  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5005/api/artworks",
        {
          artistInfo,
          artworks,
          exhibition,
        },
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Artwork submitted successfully:", response.data);
      alert("Artwork submitted successfully!");

      window.location.href = "/dashboard";

    } catch (error) {
      console.error("Error submitting artwork:", error);
      alert("Failed to submit artwork. Please try again.");
    }
  };

  return (
    <div
      className="flex items-center w-full h-full justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/src/assets/back.png')` }}
    >
      {" "}
      <form
        onSubmit={handleSubmit}
        className="bg-pallette-1 border-4 border-white p-8 rounded-3xl shadow-lg w-full max-w-xl"
      >
        {step === 1 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              Step 1: Artist Information
            </h2>
            <div className="mb-4">
              <label className="block text-xl text-white font-bold mb-2">
                Name <sup className="text-red-500">*</sup>
              </label>
              <input
                type="text"
                name="name"
                value={artistInfo.name}
                onChange={handleArtistInfoChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl text-white font-bold mb-2">
                Biography <sup className="text-red-500">*</sup>
              </label>
              <textarea
                name="biography"
                value={artistInfo.biography}
                onChange={handleArtistInfoChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl text-white font-bold mb-2">
                Email <sup className="text-red-500">*</sup>
              </label>
              <input
                type="email"
                name="email"
                value={artistInfo.email}
                onChange={handleArtistInfoChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl text-white font-bold mb-2">
                Phone <sup className="text-red-500">*</sup>
              </label>
              <input
                type="tel"
                name="phone"
                value={artistInfo.phone}
                onChange={handleArtistInfoChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={handleNextStep}
                className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              Step 2: Artwork Submission
            </h2>
            {artworks.map((artwork, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold text-white mb-4">
                  Artwork {index + 1}
                </h3>
                <div className="mb-4">
                  <label className="block text-xl text-white font-bold mb-2">
                    Title <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={artwork.title}
                    onChange={(e) => handleArtworkChange(index, e)}
                    className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xl text-white font-bold mb-2">
                    Description <sup className="text-red-500">*</sup>
                  </label>
                  <textarea
                    name="description"
                    value={artwork.description}
                    onChange={(e) => handleArtworkChange(index, e)}
                    className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-xl text-white font-bold mb-2">
                    Image <sup className="text-red-500">*</sup>
                  </label>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleArtworkChange(index, e)}
                    className="file-input file-input-bordered w-full max-w-xs text-black"
                    required
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => handleRemoveArtwork(index)}
                    className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
                  >
                    Remove Artwork
                  </button>
                </div>
              </div>
            ))}
            <div className="flex justify-center mb-4">
              <button
                type="button"
                onClick={handleAddArtwork}
                className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
              >
                Add Artwork
              </button>
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-3xl font-bold mb-6 text-center text-white">
              Step 3: Exhibition Creation (Optional)
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
              />
            </div>
            <div className="mb-4">
              <label className="block text-xl text-white font-bold mb-2">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={exhibition.location}
                onChange={handleExhibitionChange}
                className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
              >
                Back
              </button>
              <button
                type="submit"
                className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default ArtistSubmissionForm;