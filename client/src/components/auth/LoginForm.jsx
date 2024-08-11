// src/components/Auth/LoginForm.jsx
import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import { loginUser } from "../../api/api";

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = await loginUser(email, password);
            setAuth({ isAuthenticated: true, user: userData });
            navigate('/home'); // Navigate to home or dashboard after successful login
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold mb-6">Login</h2>
            <input
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
                className="input input-bordered w-full mb-4"
            />
            <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
                className="input input-bordered w-full mb-4"
            />
            <button type="submit" className="btn btn-primary w-full">Login</button>
            <p className="mt-4">Don't have an account? <Link to="/register" className="text-blue-500">Register here</Link></p>
        </form>
    );
}

export default LoginForm;
