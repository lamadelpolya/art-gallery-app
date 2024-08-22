import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const UserProfilePage = () => {
  const { auth, setAuth, login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [image, setImage] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const jwtToken = localStorage.getItem("token");
  const token = searchParams.get("token");
  useEffect(() => {
    if (token && !jwtToken) {
      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5005/api/auth/users",
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const userData = response.data;
          login(userData, token); // Usa la función login del contexto

          // Elimina el token de la URL
          const newUrl = window.location.pathname;
          window.history.replaceState(null, "", newUrl);
          navigate("/profile");
        } catch (error) {
          console.error("Error fetching user data:", error);
          setError("Failed to fetch user data.");
        }
      };

      fetchUserData();
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
        { profilePicture: imageUrl },
        {
          headers: {
            Authorization: `Bearer ${auth.token}`,
          },
        }
      );

      setAuth((prev) => ({
        ...prev,
        user: { ...prev.user, profilePicture: imageUrl },
      }));

      alert("Profile picture uploaded and updated successfully!");
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Failed to upload and update profile picture. Please try again.");
    }
    console.log(auth);
  }, [token, jwtToken]);

  useEffect(() => {
    if (!token && jwtToken) {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5005/api/auth/users",
            {
              headers: {
                Authorization: `Bearer ${jwtToken}`,
              },
            }
          );

          if (response.status !== 200) {
            throw new Error("Failed to fetch user data");
          }
          console.log(response);
          login(response.data, jwtToken);
          // login(userData, token);
          // setAuth((prev) => ({
          //   ...prev,
          //   isAuthenticated: true,
          //   user: response.data,
          // }));
        } catch (error) {
          console.error("Error during auth check:", error);
          setAuth({ isAuthenticated: false, user: null, token: null });
          setError("Failed to load user data.");

        }
      };

      fetchData();
      // console.error("Token is not available. redirect to login");
      // setError("Please log in to view your profile.");
      // navigate("/login");
      // return;
    }
  }, [jwtToken, token]);
// =======
//         setAuth((prev) => ({
//           ...prev,
//           isAuthenticated: true,
//           user: response.data,
//         }));
//       } catch (error) {
//         console.error("Error fetching user data:", error);
//         setAuth({ isAuthenticated: false, user: null, token: null });
//         setError("Failed to load user data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchUserData();
//   }, [auth.token, setAuth]);
// >>>>>>> main

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Loading...</div>;
  }

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
      {auth?.user?.profilePicture && (
        <div className="absolute top-0 right-0 mt-4 mr-4">
          <img
            src={auth.user.profilePicture}
            alt="Profile"
            className="w-40 h-40 rounded-full object-cover border-4 border-pallette-1"
          />
        </div>
      )}
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
        <p className="text-xl font-medium text-pallette-1">
          <strong>Facebook:</strong> {auth?.user?.socialLinks?.facebook || 'N/A'}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Twitter:</strong> {auth?.user?.socialLinks?.twitter || 'N/A'}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Instagram:</strong> {auth?.user?.socialLinks?.instagram || 'N/A'}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>LinkedIn:</strong> {auth?.user?.socialLinks?.linkedin || 'N/A'}
        </p>
        <p className="text-xl font-medium text-pallette-1">
          <strong>Address:</strong> {auth?.user?.address?.street || 'N/A'}, {auth?.user?.address?.city || 'N/A'}, {auth?.user?.address?.state || 'N/A'}, {auth?.user?.address?.country || 'N/A'}
        </p>
      </section>
      <div className="flex justify-center mb-4">
        <input
          type="file"

//           accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <button
          // onClick={uploadImage}
          className="ml-4 border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
        >
          Upload image
//           onClick={uploadImage}
//           className="ml-4 border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
//         >
//           Upload Image
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
