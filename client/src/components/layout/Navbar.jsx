import React, { forwardRef, useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext"; // Import AuthContext
import axios from "axios";

const Navbar = forwardRef(({ toggleSidebar }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [searchResults, setSearchResults] = useState([]); // State for search results
  const { auth, logout } = useContext(AuthContext); // Access auth state and logout function

  // Fetch search results when the user types in the search bar
  useEffect(() => {
    const fetchSearchResults = async () => {
      if (inputValue.trim()) {
        try {
          const response = await axios.get(
            `http://localhost:5005/api/search?q=${inputValue}`
          );
          setSearchResults(response.data); // Assuming your API returns an array of results
        } catch (error) {
          console.error("Error fetching search results:", error);
        }
      } else {
        setSearchResults([]); // Clear results when search input is empty
      }
    };

    fetchSearchResults();
  }, [inputValue]);

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav
      ref={ref}
      className="sticky w-screen top-0 z-50 flex items-center justify-between border-b-4 border-pallette-1 bg-white p-4 text-pallette-200"
    >
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10"
                color="#0545c1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm text-pallette-1 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
             
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/exhibitions">Exhibitions</Link>
              </li>
              <li>
                <Link to="/dashboard">Your Dashboard</Link>
              </li>
              <li>
                <Link to="/aboutus">Contacts</Link>
              </li>
              <li>
                <Link to="/">Start page</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center text-pallette-1">
          <a className="btn btn-ghost items-center text-6xl">
            <Link to="/main">ARTRA</Link>
          </a>
        </div>
        <div className="navbar-end flex items-center">
          {/* Search Bar Toggle Button */}
          <button
            onClick={toggleSearchBar}
            className="btn btn-ghost btn-circle"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              color="#0545c1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* Conditional Rendering of the Search Bar */}
          {isSearchVisible && (
            <div className="relative">
              <input
                type="text"
                className="input input-bordered ml-4"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for artists, artworks..."
              />
              {/* Search Results Dropdown */}
              {searchResults.length > 0 && (
                <div className="absolute mt-2 w-full bg-white shadow-lg rounded-md">
                  {searchResults.map((result, index) => (
                    <div
                      key={index}
                      className="block p-2 hover:bg-gray-200 cursor-pointer"
                      onClick={() => {
                        // Handle the click to navigate or show details
                      }}
                    >
                      {result.title || result.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {/* User Avatar or Login/Logout Buttons */}
          {auth.isAuthenticated ? (
            <>
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-square avatar"
              >
                <Link to="/profile">
                  <div className="w-10 rounded-full">
                    <img
                      alt="User Avatar"
                      src={auth.user.profilePicture || "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"}
                    />
                  </div>
                </Link>
              </div>
              <button onClick={logout} className="btn text-3xl text-pallette-1 btn-ghost ml-2">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn text-3xl text-pallette-1 btn-ghost ml-2">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
