import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({
    name: 'John Doe',
    email: 'johndoe@example.com',
    biography: 'Artist and painter from New York',
    phone: '123-456-7890',
    profilePicture: 'https://example.com/profile-picture.jpg', // Initial profile picture URL
  });

  const [artworks, setArtworks] = useState([
    {
      title: 'Sunset Overdrive',
      description: 'A beautiful sunset over the mountains.',
      image: 'https://example.com/image1.jpg',
    },
    {
      title: 'City Lights',
      description: 'The bustling city illuminated at night.',
      image: 'https://example.com/image2.jpg',
    },
  ]);

  const [likedArtworks, setLikedArtworks] = useState([
    {
      title: 'Ocean Breeze',
      description: 'A serene view of the ocean.',
      image: 'https://example.com/image3.jpg',
    },
  ]);

  const [browsingHistory, setBrowsingHistory] = useState([
    {
      title: 'Mountain Path',
      description: 'A winding path through the mountains.',
      image: 'https://example.com/image4.jpg',
    },
  ]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleProfilePictureChange = (e) => {
    setUserInfo({ ...userInfo, profilePicture: URL.createObjectURL(e.target.files[0]) });
    handleProfilePictureUpload(e);
  };

  const handleProfilePictureUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('profilePicture', file);

    try {
      const response = await axios.put('http://localhost:5005/api/user/me/profile-picture', formData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      setUserInfo({ ...userInfo, profilePicture: response.data.profilePictureUrl });
      alert('Profile picture updated successfully!');
    } catch (error) {
      console.error('Failed to upload profile picture', error);
    }
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put('http://localhost:5005/api/user', userInfo, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <img
          src={userInfo.profilePicture}
          alt="Profile"
          className="w-24 h-24 object-cover rounded-full mb-4"
        />
        <input type="file" onChange={handleProfilePictureChange} className="mb-4" />
        <p><strong>Name:</strong> <input type="text" name="name" value={userInfo.name} onChange={handleInputChange} className="border p-1 rounded" /></p>
        <p><strong>Email:</strong> <input type="text" name="email" value={userInfo.email} onChange={handleInputChange} className="border p-1 rounded" /></p>
        <p><strong>Biography:</strong> <textarea name="biography" value={userInfo.biography} onChange={handleInputChange} className="border p-1 rounded w-full" /></p>
        <p><strong>Phone:</strong> <input type="text" name="phone" value={userInfo.phone} onChange={handleInputChange} className="border p-1 rounded" /></p>
      </div>

      <button onClick={handleSaveChanges} className="bg-blue-500 text-white px-4 py-2 rounded mb-8">Save Changes</button>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">My Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artworks.map((artwork, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{artwork.title}</h3>
              <p className="text-gray-700">{artwork.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Liked Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {likedArtworks.map((artwork, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{artwork.title}</h3>
              <p className="text-gray-700">{artwork.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Browsing History</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {browsingHistory.map((artwork, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <h3 className="text-xl font-bold">{artwork.title}</h3>
              <p className="text-gray-700">{artwork.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <Link to="/submit-art" className="btn btn-primary">
          Submit New Artwork
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
