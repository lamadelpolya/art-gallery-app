// src/components/Auth/RegisterForm.jsx
import React, { useState } from "react";
import axios from "axios";

function RegisterForm() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/auth/register", formData);
      // Handle successful registration
    } catch (error) {
      // Handle registration error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Username"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleChange}
        className="input input-bordered w-full mb-4"
        placeholder="Password"
      />
      <button type="submit" className="btn btn-primary w-full">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
