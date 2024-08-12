import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserProfilePage = () => {
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    biography: '',
    phone: '',
  });
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/users', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Assuming you're using JWT tokens
          },
        });
        const data = await response.json();
        setUserInfo(data.userInfo);
        setArtworks(data.artworks);
        setLoading(false);
      } catch (error) {
        setError('Error fetching user profile data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(userInfo),
      });
      if (!response.ok) {
        throw new Error('Failed to update profile');
      }
      alert('Profile updated successfully!');
    } catch (error) {
      setError('Error updating profile');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto my-10 p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-4">User Profile</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-8">
          <h2 className="text-2xl font-semibold">Personal Information</h2>
          <label>
            <strong>Name:</strong>
            <input
              type="text"
              name="name"
              value={userInfo.name}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label>
            <strong>Email:</strong>
            <input
              type="email"
              name="email"
              value={userInfo.email}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label>
            <strong>Biography:</strong>
            <textarea
              name="biography"
              value={userInfo.biography}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
          <label>
            <strong>Phone:</strong>
            <input
              type="text"
              name="phone"
              value={userInfo.phone}
              onChange={handleInputChange}
              className="border p-2 w-full"
            />
          </label>
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
          <button type="submit" className="btn btn-primary">
            Save Changes
          </button>
        </div>
      </form>

      <div className="flex justify-end mt-4">
        <Link to="/submit-art" className="btn btn-secondary">
          Submit New Artwork
        </Link>
      </div>
    </div>
  );
};

export default UserProfilePage;
