import axios from 'axios';

const API_URL = "http://localhost:5005/api"; // Make sure this matches your backend URL

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});
const client_id = '1dfa3dd0b367ae0dd5bf';
const client_secret = '6dad8e7a3c39d669bcbc3aee054810c5';

export const getArtsyToken = async () => {
    try {
        const response = await axios.post('https://api.artsy.net/api/tokens/xapp_token', {}, {
            params: {
                client_id,
                client_secret,
            },
        });
        const token = response.data.token;
        return token;
    } catch (error) {
        console.error('Error fetching the Artsy API token:', error);
        throw error;
    }
};
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
    const response = await api.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    console.error("Error during login:", error);
    throw error;
  }
};
export const fetchArtworks = async () => {
  try {
    const response = await axios.get(`${API_URL}/artworks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching artworks:", error);
    throw error;
  }
};
