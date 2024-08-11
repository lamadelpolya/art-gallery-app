import axios from 'axios';

const API_URL = "http://localhost:5005/api"; // Make sure this matches your backend URL

// Register a new user
export const RegisterUser = async (formData) => {
  try {
    const response = await api.post("/auth/register", formData);
    return response.data;
  } catch (error) {
    console.error("Error during registration:", error);
    throw error; // It's good practice to rethrow the error so that the calling function can handle it
  }
};


// Login a user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

