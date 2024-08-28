import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";

const UserProfilePage = () => {
  const { auth, login, setAuth } = useAuth();
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tokenFromUrl = searchParams.get("token");
  const jwtToken = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserData = async (token) => {
      try {
        const response = await axios.get(
          "http://localhost:5005/api/auth/users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        login(response.data, token);
        setError(null);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data.");
      }
    };

    if (tokenFromUrl && !jwtToken) {
      fetchUserData(tokenFromUrl);
      window.history.replaceState(null, "", window.location.pathname);
    } else if (jwtToken && !auth.user) {
      fetchUserData(jwtToken);
    }
  }, [tokenFromUrl, jwtToken, auth.user, login]);

  const uploadImage = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "artramuseum");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/dp5pdktmv/image/upload",
        data
      );
      const imageUrl = res.data.url;

      await axios.put(
        "http://localhost:5005/api/auth/update",
        { photo: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setAuth((prev) => ({
        ...prev,
        user: { ...prev.user, photo: imageUrl },
      }));

      alert("Profile picture uploaded and updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload and update profile picture. Please try again.");
    }
  };

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!auth.token) {
    return (
      <div className="text-center text-red-500 mt-10">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="container relative border-4 border-pallette-1 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-6xl text-center text-pallette-1 font-bold mb-8">
        User Profile
      </h1>
      <section className="mb-12">
        <h2 className="text-3xl text-pallette-1 font-bold mb-4">
          Personal Information
        </h2>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Name:</strong> {auth?.user?.name}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Email:</strong> {auth?.user?.email}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Biography:</strong> {auth?.user?.biography}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Phone:</strong> {auth?.user?.phone}
        </p>
        {auth?.user?.photo && (
          <div className="flex justify-center mt-8">
            <img
              src={auth.user.photo}
              alt="Profile"
              className="w-40 h-40 rounded-full object-cover mb-4 border-4 border-pallette-1"
            />
          </div>
        )}
      </section>
      <div className="flex justify-center mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <button
          onClick={uploadImage}
          className="ml-4 border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
        >
          Upload Image
        </button>
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={() => navigate("/edit-profile")}
          className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default UserProfilePage;
