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
    description: "",
    date: "",
    location: "",
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
    const { name, value, files } = e.target;
    const newArtworks = [...artworks];

    if (name === "file") {
      // If the input is a file, store the file itself
      newArtworks[index] = {
        ...newArtworks[index],
        file: files[0], // Store the file object
      };
    } else {
      newArtworks[index] = {
        ...newArtworks[index],
        [name]: value,
      };
    }

    setArtworks(newArtworks);
  };

  const handleAddArtwork = () => {
    setArtworks([...artworks, { title: "", description: "", file: null }]);
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

    const formData = new FormData();

    // Append artist info to form data
    for (let key in artistInfo) {
      formData.append(`artistInfo[${key}]`, artistInfo[key]);
    }

    // Append exhibition info to form data
    for (let key in exhibition) {
      formData.append(`exhibition[${key}]`, exhibition[key]);
    }

    // Append artworks to form data
    artworks.forEach((artwork, index) => {
      formData.append(`artworks[${index}][title]`, artwork.title);
      formData.append(`artworks[${index}][description]`, artwork.description);
      if (artwork.file) {
        formData.append(`artworks[${index}][image]`, artwork.file);
      }
    });

    try {
      const response = await axios.post(
        "http://localhost:5005/api/artworks",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // This is important for file uploads
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Artwork submitted successfully:", response.data);
      alert("Artwork submitted successfully!");
    } catch (error) {
      console.error("Error submitting artwork:", error);
      alert("Failed to submit artwork. Please try again.");
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Step 1: Artist Information
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={artistInfo.name}
                onChange={handleArtistInfoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Biography
              </label>
              <textarea
                name="biography"
                value={artistInfo.biography}
                onChange={handleArtistInfoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={artistInfo.email}
                onChange={handleArtistInfoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Phone
              </label>
              <input
                type="tel"
                name="phone"
                value={artistInfo.phone}
                onChange={handleArtistInfoChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <button
              type="button"
              onClick={handleNextStep}
              className="btn btn-primary"
            >
              Next
            </button>
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Step 2: Artwork Submission
            </h2>
            {artworks.map((artwork, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-xl font-semibold">Artwork {index + 1}</h3>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={artwork.title}
                    onChange={(e) => handleArtworkChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={artwork.description}
                    onChange={(e) => handleArtworkChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <div className="mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Image
                  </label>
                  <input
                    type="file"
                    name="file"
                    onChange={(e) => handleArtworkChange(index, e)}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleRemoveArtwork(index)}
                  className="btn btn-danger"
                >
                  Remove Artwork
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddArtwork}
              className="btn btn-secondary mb-4"
            >
              Add Artwork
            </button>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="btn btn-primary"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-2xl font-bold mb-4">
              Step 3: Exhibition Creation (Optional)
            </h2>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Exhibition Title
              </label>
              <input
                type="text"
                name="title"
                value={exhibition.title}
                onChange={handleExhibitionChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={exhibition.description}
                onChange={handleExhibitionChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={exhibition.date}
                onChange={handleExhibitionChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={exhibition.location}
                onChange={handleExhibitionChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="btn btn-secondary"
              >
                Back
              </button>
              <button type="submit" className="btn btn-primary">
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
