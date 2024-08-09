// src/pages/ProfilePage.jsx
import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

function ProfilePage() {
  const { auth } = useContext(AuthContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (auth) {
      axios.get('/api/users/profile')
        .then(response => setUserData(response.data))
        .catch(error => console.error(error));
    }
  }, [auth]);

  if (!auth) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold">Your Profile</h1>
      {userData && (
        <div>
          <p><strong>Name:</strong> {userData.name}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          {/* Add more profile details */}
        </div>
      )}
    </div>
  );
}

export default ProfilePage;
