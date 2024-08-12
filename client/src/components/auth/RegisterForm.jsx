import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterUser } from "../../../../server/api/api";

function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    try {
      await RegisterUser(formData);
      navigate("/login"); // Redirect to login after registration
    } catch (error) {
      setError("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="form-container bg-white p-6 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        placeholder="Name"
        required
        className="input input-bordered w-full mb-4"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        placeholder="Email"
        required
        className="input input-bordered w-full mb-4"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        placeholder="Password"
        required
        className="input input-bordered w-full mb-4"
      />
      <button type="submit" className="btn btn-primary w-full">
        Register
      </button>
    </form>
  );
}

export default RegisterForm;
