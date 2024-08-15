import React, { forwardRef, useState } from "react";
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
      className="sticky w-screen top-0 z-50 flex items-center justify-between  border-b-4 border-pallette-1  bg-white p-4 text-pallette-200"
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
              className="menu menu-sm  text-pallette-1 dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/collections">Collections</Link>
              </li>
              <li>
                <Link to="/exhibitions">Exhibitions</Link>
              </li>
              <li>
                <Link to="/aboutus">Contacts</Link>
              </li>
              <li>
                <Link to="/">Start page</Link>
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
          {/* User Avatar */}

          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-square avatar"
          >
            <Link to="/profile">
              <div className="w-10 rounded-full">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
});

Navbar.displayName = "Navbar";

export default Navbar;
