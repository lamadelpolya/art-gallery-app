// src/pages/ProtectedPage.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function ProtectedPage() {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return <div>You need to log in to access this page.</div>;
  }

  return (
    <div>
      <h1>Protected Content</h1>
    </div>
  );
}

export default ProtectedPage;
