import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message);
        return;
      }
      localStorage.setItem("token", data.token); // Save token to localStorage

      navigate("/profile"); // Navigate to user profile page
    } catch (error) {
      setError(error.message);
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="bg-pallette-1 p-8 rounded-3xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-white">
          Login
        </h2>
        <div className="mb-4">
          <label className="block text-xl text-white font-bold mb-2">
            Email <sup className="text-red-500">*</sup>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email address"
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-xl text-white font-bold mb-2">
            Password <sup className="text-red-500">*</sup>
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            className="w-full px-4 py-2 border rounded-lg text-black focus:outline-none"
            required
          />
        </div>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-center">
          <button type="submit" className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4 fy">
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
