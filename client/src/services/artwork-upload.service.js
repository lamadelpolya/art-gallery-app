import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005/api" // Base URL of the server
});

const errorHandler = (err) => {
  throw err;
};

const uploadImage = (file) => {
  return api.post("/artworks", file)
    .then(res => res.data)
    .catch(errorHandler);
};

const createArtwork = (newArtwork) => {
  return api.post("/artworks", newArtwork)
    .then(res => res.data)
    .catch(errorHandler);
};
const getArtworks = () => {
  return api.get("/artworks")
    .then(res => res.data)
    .catch(errorHandler);
};
export default {
  uploadImage,
  createArtwork,
  getArtworks
};

