import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";

const UserProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!auth.token) throw new Error("token must be provided");
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

        // const fetchUserArtworks = async () => {
        //   try {
        //     const response = await axios.get(
        //       "http://localhost:5005/api/artworks",
        //       {
        //         headers: {
        //           Authorization: `Bearer ${auth.token}`,
        //         },
        //       }
        //     );
        //     if (!response.status === 200) {
        //       throw new Error("Failed to fetch artworks");
        //     }
        //     const artworksData = response.data;
        //     setArtworks(artworksData);
        //   } catch (error) {
        //     console.error(
        //       "Error during auth check or fetching artworks:",
        //       error
        //     );
        //     setAuth({ isAuthenticated: false, user: null, token: null });
        //   } finally {
        //     setLoading(false);
        //   }
        // };

        fetchUserArtworks();
      } catch (error) {
        console.error("Error during auth check or fetching artworks:", error);
        setAuth({ isAuthenticated: false, user: null, token: null });
      }
    };

    fetchData();
  }, [auth.token]);

  // if (loading) {
  //   return <div>Loading artworks...</div>;
  // }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <p>
          <strong>Name:</strong> {auth?.user?.name}
        </p>
        <p>
          <strong>Email:</strong> {auth?.user?.email}
        </p>
        <p>
          <strong>Biography:</strong> {auth?.user?.biography}
        </p>
        <p>
          <strong>Phone:</strong> {auth?.user?.phone}
        </p>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => navigate("/edit-profile")}
          className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4 fy"
        >
          Edit Profile
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4 fy"
        >
          Your Arts
        </button>
      </div>
      
{/* 
      <div className="mb-8 mt-8">
        <h2 className="text-2xl font-semibold">My Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artworks.map((artwork, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{artwork.title}</h3>
              <p className="text-gray-700">{artwork.description}</p>
            </div>
          ))}
        </div>
      </div> */}

      {/* <div className="flex justify-end mt-4">
        <Link to="/submit-art" className="btn btn-secondary">
          Submit New Artwork
        </Link>
      </div> */}
    </div>
  );
};

export default UserProfilePage;
