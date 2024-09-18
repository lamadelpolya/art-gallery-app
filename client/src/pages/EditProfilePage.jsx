import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileUpdateForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    biography: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Fetch user info on page load
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage

        if (!token) {
          throw new Error("Authorization token not found.");
        }

        const response = await axios.get("http://localhost:5005/api/auth/users", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the request
          },
        });

        setUserInfo({
          name: response.data.name || "",
          email: response.data.email || "",
          biography: response.data.biography || "",
          phone: response.data.phone || "",
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
        setError("Failed to load user information. Please try again.");
      }
    };

    fetchUserInfo();
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authorization token not found. Please log in again.");
      return;
    }
  
    console.log("Token being sent: ", token);  // Log the token before the request
  
    const formData = new FormData();
    formData.append("name", userInfo.name || "");
    formData.append("email", userInfo.email || "");
    formData.append("biography", userInfo.biography || "");
    formData.append("phone", userInfo.phone || "");
  
    try {
      const response = await axios.put(
        "http://localhost:5005/api/auth/update",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,  // Send the token here
            "Content-Type": "multipart/form-data",  // Form data type
          },
        }
      );
  
      setUserInfo({
        name: response.data.name,
        email: response.data.email,
        biography: response.data.biography,
        phone: response.data.phone,
      });
  
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("Failed to update profile. Please try again.");
    }
  };
  

  return (
    <div
      className="flex items-center w-full h-full justify-center min-h-screen bg-cover bg-center bg-scroll"
      style={{ backgroundImage: `url('/src/assets/back.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-pallette-1 p-8 rounded-3xl shadow-lg w-full max-w-md"
      >
        <fieldset>
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            Update Profile
          </h2>

          <div className="mb-4">
            <label className="block text-xl text-white font-bold mb-2">
              Name <sup className="text-red-500">*</sup>
            </label>
            <input
              type="text"
              name="name"
              value={userInfo.name || ""}
              onChange={handleInputChange}
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
              value={userInfo.email || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl text-white font-bold mb-2">
              Biography
            </label>
            <textarea
              name="biography"
              value={userInfo.biography || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            />
          </div>

          <div className="mb-4">
            <label className="block text-xl text-white font-bold mb-2">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              value={userInfo.phone || ""}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

          <div className="flex justify-center">
            <button
              type="submit"
              className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-11 py-4"
            >
              Update Profile
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default ProfileUpdateForm;
