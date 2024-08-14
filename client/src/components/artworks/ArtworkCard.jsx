import React from 'react';

const ArtworkCard = ({ artwork }) => {
    const imageUrl = artwork._links && artwork._links.thumbnail && artwork._links.thumbnail.href
        ? artwork._links.thumbnail.href.replace('{image_version}', 'large')
        : null;

    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={artwork.title}
                    className="w-full h-48 object-cover rounded-md mb-4"
                />
            ) : (
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4 flex items-center justify-center">
                    <span>No Image Available</span>
                </div>
            )}
            <h2 className="text-xl font-semibold">{artwork.title}</h2>
            <p className="text-gray-700">{artwork.artist ? artwork.artist.name : 'Unknown Artist'}</p>
        </div>
    );
};

export default ArtworkCard;