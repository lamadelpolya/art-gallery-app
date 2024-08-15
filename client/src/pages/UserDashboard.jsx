import React from 'react';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-6">My Dashboard</h1>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">My Artworks</h2>
        <Link to="/submit-art" className="text-blue-500">Submit New Artwork</Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">My Collections</h2>
        <Link to="/collections" className="text-blue-500">Manage My Collections</Link>
      </div>

      <div className="mb-8">
        <h2 className="text-3xl font-semibold mb-4">Profile Settings</h2>
        <Link to="/profile" className="text-blue-500">Back to Profile</Link>
      </div>
    </div>
  );
};

export default UserDashboard;
