import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({ value: "", isTouched: false });
  const [role, setRole] = useState("role");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleRegister = () => {
    window.location.href = "/api/auth/google"; // Redirect for Google registration
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
        const errorData = await response.json();
        throw new Error(errorData.error || "Registration failed");
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div
      className="flex items-center w-full h-full justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url('/src/assets/back.png')` }}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-pallette-1 p-8 rounded-3xl border-4 border-white shadow-lg w-full max-w-md"
      >
        {/* Your existing form fields */}
        <div className="flex justify-center mt-4">
          <button
            type="button"
            onClick={handleGoogleRegister}
            className="w-full py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Register with Google
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
