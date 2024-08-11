// src/components/ArtworkCard.jsx
import React from 'react';

function ArtworkCard({ artwork }) {
    return (
        <div className="card">
            <img src={artwork.imageUrl} alt={artwork.title} style={{ width: "100%" }} />
            <div className="container">
                <h4><b>{artwork.title}</b></h4>
                <p>{artwork.description}</p>
            </div>
        </div>
    );
}

export default ArtworkCard;
