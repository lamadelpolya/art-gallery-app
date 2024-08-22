import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

const UserProfilePage = () => {
  const { auth, setAuth, login } = useAuth();
  const [error, setError] = useState(null);
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
          {auth.user?.profilePicture && (
            <img
              src={auth?.user?.profilePicture}
              alt="Profile"
              className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-pallette-1"
            />
          )}
        </div>
      </section>
      <div className="flex justify-center mb-4">
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-2"
        />
        <button
          // onClick={uploadImage}
          className="ml-4 border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4"
        >
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
