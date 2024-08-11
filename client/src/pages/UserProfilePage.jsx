import React from 'react';
import { Link } from 'react-router-dom';

const UserProfile = () => {
  const userInfo = {
    name: 'John Doe',
    email: 'johndoe@example.com',
    biography: 'Artist and painter from New York',
    phone: '123-456-7890',
  };

  const artworks = [
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
  ];

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      <div className="mb-8">
        <h2 className="text-2xl font-semibold">Personal Information</h2>
        <p><strong>Name:</strong> {userInfo.name}</p>
        <p><strong>Email:</strong> {userInfo.email}</p>
        <p><strong>Biography:</strong> {userInfo.biography}</p>
        <p><strong>Phone:</strong> {userInfo.phone}</p>
      </div>

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

      <div className="flex justify-end">
        <Link to="/submit-art" className="btn btn-primary">
          Submit New Artwork
        </Link>
      </div>
    </div>
  );
};

export default UserProfile;
