import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfileUpdateForm = () => {
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    biography: "",
    phone: "",
    profilePicture: null, // to handle file upload
  });

  const navigate = useNavigate(); // Initialize the navigate function

  useEffect(() => {
    // Fetch the current user info to populate the form
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/auth/users",
          {
            headers: {
              authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        setUserInfo({
          name: response.data.name,
          email: response.data.email,
          biography: response.data.biography,
          phone: response.data.phone,
        });
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, []);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", userInfo.name);
    formData.append("email", userInfo.email);
    formData.append("biography", userInfo.biography);
    formData.append("phone", userInfo.phone);

    if (userInfo.profilePicture) {
      formData.append("profilePicture", userInfo.profilePicture);
    }

    try {
      const response = await axios.put(
        "http://localhost:5005/api/auth/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("Profile updated successfully:", response.data);
      alert("Profile updated successfully!");
      navigate("/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
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
              value={userInfo.name}
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
              value={userInfo.email}
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
              value={userInfo.biography}
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
              value={userInfo.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            />
          </div>

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
