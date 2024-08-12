import React, { useEffect, useState } from "react";
import ArtworkCard from "../components/artworks/ArtworkCard";
import { getArtsyToken } from "../../../server/api/api";
import axios from "axios";

function MainPage() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchArtsyArtworks = async () => {
      try {
        const token = await getArtsyToken();
        const response = await axios.get("https://api.artsy.net/api/artworks", {
          headers: {
            "X-Xapp-Token": token,
          },
        });
        console.log(
          "Artsy artworks fetched successfully:",
          response.data._embedded.artworks
        );
        return response.data._embedded.artworks;
      } catch (error) {
        console.error("Error fetching artworks from Artsy:", error);
        return []; // Return an empty array if there is an error
      }
    };

    const fetchLocalArtworks = async () => {
      try {
        const response = await axios.get("http://localhost:5005/api/artworks");
        console.log("Local artworks fetched successfully:", response.data);
        return response.data; // Adjust based on the structure of your response
      } catch (error) {
        console.error("Error fetching artworks from local API:", error);
        return []; // Return an empty array if there is an error
      }
    };

    const fetchAllArtworks = async () => {
      setLoading(true);
      try {
        const [artsyArtworks, localArtworks] = await Promise.all([
          fetchArtsyArtworks(),
          fetchLocalArtworks(),
        ]);
        setArtworks([...localArtworks, ...artsyArtworks]);
        console.log("Combined artworks:", [...localArtworks, ...artsyArtworks]);
      } catch (error) {
        setError("Failed to load artworks. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchAllArtworks();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5005/api/search?query=${searchQuery}`
      );
      setArtworks(response.data);
    } catch (error) {
      console.error("Error searching artworks:", error);
      setError("Failed to search artworks. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="container mx-auto mt-8 text-center">Loading...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto mt-8 text-red-500 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      {/* Hero Section */}
      <div
        className="hero-section bg-cover bg-center text-white py-20 text-center"
        style={{
          backgroundImage: `url('https://www.google.com/search?q=monet&tbm=isch&ved=2ahUKEwi7gJ_mne-HAxXx_AIHHaD7OJIQ2-cCegQIABAA&oq=monet&gs_lp=EgNpbWciBW1vbmV0MgoQABiABBhDGIoFMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAEMgUQABiABDIFEAAYgAQyBRAAGIAESOUxUIUpWLkwcAB4AJABAJgBXKAByQOqAQE2uAEDyAEA-AEBigILZ3dzLXdpei1pbWfCAgQQIxgniAYB&sclient=img&ei=Q-K5ZvvSM_H5i-gPoPfjkQk&bih=791&biw=767&rlz=1C1CHBF_ukDE1012DE1012#imgrc=dVY_ctePpr06FM')`,
        }} // Replace with your hero image URL
      >
        <div className="container mx-auto">
          <h1 className="text-5xl font-bold mb-4">
            Discover Incredible Art &amp; Artists
          </h1>
          <p className="text-xl mb-8">
            Explore a diverse collection of artworks from around the world.
          </p>
          <button className="btn btn-primary mt-4">Explore Now</button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-8 mt-6">
        <div className="form-control">
          <div className="input-group">
            <input
              type="text"
              placeholder="Search for artworks, artists, or collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="input input-bordered w-full"
            />
            <button onClick={handleSearch} className="btn btn-primary">
              Search
            </button>
          </div>
        </div>
      </div>

      {/* Filter by Category */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Filter by Category</h2>
        <div className="flex space-x-4">
          <button className="btn btn-secondary">Paintings</button>
          <button className="btn btn-secondary">Sculptures</button>
          <button className="btn btn-secondary">Photography</button>
          <button className="btn btn-secondary">Drawings</button>
        </div>
      </div>

      {/* Featured Artworks */}
      <div className="featured-artworks py-12">
        <h2 className="text-3xl font-bold mb-6">Featured Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {artworks.slice(0, 4).map((artwork) => (
            <ArtworkCard key={artwork.id || artwork._id} artwork={artwork} />
          ))}
        </div>
      </div>

      {/* Artworks Feed */}
      <div className="artworks-feed py-12">
        <h2 className="text-3xl font-bold mb-6">Browse Artworks</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artworks.map((artwork) => (
            <ArtworkCard key={artwork.id || artwork._id} artwork={artwork} />
          ))}
        </div>
        <div className="text-center mt-8">
          <button className="btn btn-primary">Load More Artworks</button>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
