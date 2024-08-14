import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const EditProfilePage = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    biography: "",
    phone: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // Use useNavigate

  useEffect(() => {
    if (auth?.user) {
      setUserInfo({
        name: auth.user.name || "",
        email: auth.user.email || "",
        biography: auth.user.biography || "",
        phone: auth.user.phone || "",
      });
    }
  }, [auth.user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5005/api/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`,
        },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      const updatedUser = await response.json();
      setAuth((prev) => ({
        ...prev,
        user: updatedUser,
      }));
      navigate("/profile"); // Use navigate to redirect after saving
    } catch (error) {
      setError("Error updating profile");
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label>
            <strong>Biography:</strong>
            <textarea
              name="biography"
              value={userInfo.biography}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label>
            <strong>Phone:</strong>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
        </div>
        <div className="flex justify-end">
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProfilePage;
