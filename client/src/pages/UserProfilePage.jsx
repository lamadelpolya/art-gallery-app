import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
// import {handleUpload} from "../components/ProfilePictureUpload"
import axios from "axios";

const UserProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [error, setError] = useState(null);
  // const [selectedFile, setSelectedFile] = useState(null); // State for selected file
  // const [uploading, setUploading] = useState(false); // State to manage uploading status
  // const [profileImageUrl, setProfileImageUrl] = useState(auth?.user?.profilePicture || ''); // Initial state for profile image
  const navigate = useNavigate();
console.log(auth)
  // const handleFileChange = (e) => {
  //   setSelectedFile(e.target.files[0]);
  // };

  // const handleUpload = async () => {
  //   if (!selectedFile) {
  //     alert('Please select a file first.');
  //     return;
  //   }

  //   setUploading(true);

  //   try {
  //     const imageUrl = await uploadImageToCloudinary(selectedFile);
  //     setProfileImageUrl(imageUrl);

  //     // Send the image URL to your backend to update the user's profile
  //     await axios.post(
  //       'http://localhost:5005/api/user/profile-picture',
  //       { imageUrl },
  //       {
  //         headers: {
  //           Authorization: `Bearer ${auth.token}`,
  //         },
  //       }
  //     );

  //     // Update the auth context with the new profile picture
  //     setAuth((prev) => ({
  //       ...prev,
  //       user: { ...prev.user, profilePicture: imageUrl },
  //     }));

  //     alert('Profile picture uploaded successfully!');
  //   } catch (error) {
  //     alert('Error uploading profile picture.');
  //   } finally {
  //     setUploading(false);
  //   }
  // };

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
        console.log(response)
        if (!response.ok) {
          
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log(data)
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
      <h1 className="text-6xl text-center text-pallette-1 font-bold mb-8">User Profile</h1>

      <section className="mb-12">
        <h2 className="text-3xl text-pallette-1 font-bold mb-4">Personal Information</h2>
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
      </section>

      {/* <section className="mb-12">
        <h3 className="text-3xl text-pallette-1 font-bold mb-4">Profile Picture</h3>
        {profileImageUrl && (
          <img
            src={profileImageUrl}
            alt="Profile"
            className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-pallette-1"
          />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="mb-2"
        />
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
        >
          {uploading ? 'Uploading...' : 'Upload Profile Picture'}
        </button>
      </section> */}

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
