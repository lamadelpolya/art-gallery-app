import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const EditProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    name: auth.user.name || "",
    email: auth.user.email || "",
    biography: auth.user.biography || "",
    phone: auth.user.phone || "",
    facebook: auth.user.socialLinks?.facebook || "",
    twitter: auth.user.socialLinks?.twitter || "",
    instagram: auth.user.socialLinks?.instagram || "",
    linkedin: auth.user.socialLinks?.linkedin || "",
    street: auth.user.address?.street || "",
    city: auth.user.address?.city || "",
    state: auth.user.address?.state || "",
    zip: auth.user.address?.zip || "",
    country: auth.user.address?.country || "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = {
      name: profileData.name,
      email: profileData.email,
      biography: profileData.biography,
      phone: profileData.phone,
      socialLinks: {
        facebook: profileData.facebook,
        twitter: profileData.twitter,
        instagram: profileData.instagram,
        linkedin: profileData.linkedin,
      },
      address: {
        street: profileData.street,
        city: profileData.city,
        state: profileData.state,
        zip: profileData.zip,
        country: profileData.country,
      },
    };

    try {
      const response = await axios.put(
        "http://localhost:5005/api/auth/update",
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );
      setAuth((prev) => ({
        ...prev,
        user: response.data,
      }));
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="container border-4 border-pallette-1 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-6xl text-center text-pallette-1 font-bold mb-8">
        Edit Profile
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={profileData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Biography
          </label>
          <textarea
            name="biography"
            value={profileData.biography}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Phone
          </label>
          <input
            type="tel"
            name="phone"
            value={profileData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Facebook
          </label>
          <input
            type="text"
            name="facebook"
            value={profileData.facebook}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Twitter
          </label>
          <input
            type="text"
            name="twitter"
            value={profileData.twitter}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Instagram
          </label>
          <input
            type="text"
            name="instagram"
            value={profileData.instagram}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            LinkedIn
          </label>
          <input
            type="text"
            name="linkedin"
            value={profileData.linkedin}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Street Address
          </label>
          <input
            type="text"
            name="street"
            value={profileData.street}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            City
          </label>
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            State
          </label>
          <input
            type="text"
            name="state"
            value={profileData.state}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            ZIP Code
          </label>
          <input
            type="text"
            name="zip"
            value={profileData.zip}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-pallette-1 font-bold mb-2">
            Country
          </label>
          <input
            type="text"
            name="country"
            value={profileData.country}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
          />
        </div>
        <div className="flex justify-center mt-8">
          <button
            type="submit"
            className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
