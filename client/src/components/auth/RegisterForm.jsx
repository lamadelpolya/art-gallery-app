import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_LOCAL_API_URL;

const PasswordErrorMessage = () => {
  return (
    <p className="text-red-500 text-sm mt-1">
      Password should have at least 8 characters
    </p>
  );
};

function RegistrationForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return /\S+@\S+\.\S+/.test(email);
  };

  const getIsFormValid = () => {
    return (
      name &&
      validateEmail(email) &&
      password.value.length >= 8 &&
      role !== "role"
    );
  };

  const clearForm = () => {
    setName("");
    setEmail("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password: password.value,
          role,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json(); // Extract the error message
        throw new Error(errorData.error || "Registration failed");
      }

      alert("Account created successfully!");
      clearForm();
      navigate("/login"); // Navigate to login page after registration
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <fieldset>
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
            Sign Up
          </h2>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Name <sup className="text-red-500">*</sup>
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Name"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Email address <sup className="text-red-500">*</sup>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Email address"
              type="email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Password <sup className="text-red-500">*</sup>
            </label>
            <input
              value={password.value}
              type="password"
              onChange={(e) => {
                setPassword({ ...password, value: e.target.value });
              }}
              onBlur={() => {
                setPassword({ ...password, isTouched: true });
              }}
              placeholder="Password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            />
            {password.isTouched && password.value.length < 8 ? (
              <PasswordErrorMessage />
            ) : null}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Role <sup className="text-red-500">*</sup>
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
              required
            >
              <option value="role">Role</option>
              <option value="individual">Artist</option>
              <option value="business">Visitor</option>
            </select>
          </div>
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            type="submit"
            disabled={!getIsFormValid()}
            className="border border-white rounded-[60px] hover:bg-gray-700 bg-pallette-1 text-white text-[25px] font-semibold px-10 py-4 fy"
          >
            Create account
          </button>
        </fieldset>
      </form>
    </div>
  );
}

export default RegistrationForm;