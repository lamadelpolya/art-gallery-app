import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const UserProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const navigate = useNavigate();

  const uploadImage = async () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "artramuseum");
    data.append("cloud_name", "dp5pdktmv"); // Add your Cloudinary cloud name here

    try {
      const res = await axios.post("https://api.cloudinary.com/v1_1/dp5pdktmv/image/upload", data);
      const imageUrl = res.data.url; // Correctly get the URL of the uploaded image

      // Update the user's profile with the new profile picture URL
      await axios.put(
        "http://localhost:5005/api/auth/update",
        { profilePicture: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          }
        }
      );

      // Update the auth context with the new profile picture
      setAuth((prev) => ({
        ...prev,
        user: { ...prev.user, profilePicture: imageUrl },
      }));

      alert('Profile picture uploaded and updated successfully!');
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    if (!auth.token) {
      // If token is not available, don't attempt to fetch data
      console.error("Token is not available.");
      setError("Please log in to view your profile.");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/auth/users", {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setAuth((prev) => ({
          ...prev,
          isAuthenticated: true,
          user: data,
        }));
      } catch (error) {
        console.error("Error during auth check:", error);
        setAuth({ isAuthenticated: false, user: null, token: null });
        setError("Failed to load user data.");
      }
    };

    fetchData();
  }, [auth.token, setAuth]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!auth.token) {
    return <div>Please log in to view your profile.</div>;
  }

  return (
    <div className="container border-4 border-pallette-1 mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
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
        <div className="flex justify-center mt-8">
          {auth.user.profilePicture && (
            <img
              src={auth.user.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-pallette-1"
            />
          )}
        </div>
      </section>
      <div className="flex justify-center mb-4">
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="mb-2" />
        <button onClick={uploadImage} className="ml-4 border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4">
          Upload image
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
