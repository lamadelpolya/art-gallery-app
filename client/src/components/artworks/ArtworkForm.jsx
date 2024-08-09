// src/components/Artworks/ArtworkForm.jsx
import React, { useState } from 'react';
import axios from 'axios';

function ArtworkForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/artworks', { title, description, imageUrl });
      // Handle successful artwork creation
    } catch (error) {
      // Handle error
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Add New Artwork</h2>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="input input-bordered w-full mb-4" placeholder="Title" />
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="input input-bordered w-full mb-4" placeholder="Description" />
      <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="input input-bordered w-full mb-4" placeholder="Image URL" />
      <button type="submit" className="btn btn-primary w-full">Submit</button>
    </form>
  );
}

export default ArtworkForm;
