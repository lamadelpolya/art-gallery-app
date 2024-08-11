// Add to ArtworkCard.jsx or create new components for actions like commenting
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

function LikeButton({ artworkId }) {
    const { auth } = useContext(AuthContext);

    const handleLike = async () => {
        if (!auth.isAuthenticated) {
            alert('Please log in to like artworks.');
            return;
        }
        // Proceed with like action...
    };

    return (
        <button onClick={handleLike} className="btn btn-primary">
            Like
        </button>
    );
}
