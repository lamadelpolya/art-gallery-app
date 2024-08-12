import { forwardRef, useState } from "react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = forwardRef(({ toggleSidebar }, ref) => {
  const [inputValue, setInputValue] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const navigate = useNavigate();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      navigate(`/search?q=${inputValue}`);
      setInputValue(""); // Clear the search input after submission
      setIsSearchVisible(false); // Hide the search bar after submission
    }
  };

  const toggleSearchBar = () => {
    setIsSearchVisible(!isSearchVisible);
  };

  return (
    <nav
      ref={ref}
      className="sticky top-0 z-50 flex items-center justify-between border-2 border-pallette-50 bg-pallette-400 p-4 text-pallette-200"
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
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <a className="btn btn-ghost text-xl">
            <Link to="/main"> ARTRA</Link>
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
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {/* Conditional Rendering of the Search Bar */}
          {isSearchVisible && (
            <form onSubmit={handleSearchSubmit} className="form-inline ml-4">
              <input
                type="text"
                className="input input-bordered"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search for artists, artworks..."
              />
              <button type="submit" className="btn btn-primary ml-2">
                Search
              </button>
            </form>
          )}
          <button className="btn btn-ghost btn-circle">
            <Link to="/profile">
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
            </Link>
          </button>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
