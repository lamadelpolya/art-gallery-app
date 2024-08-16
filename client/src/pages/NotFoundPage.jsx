// src/pages/NotFoundPage.jsx
import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-8xl text-pallette-1 font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-pallette-1 text-2xl mb-8">
        Sorry, the page you are looking for does not exist.
      </p>
      <Link
        to="/"
        className="btn bg-pallette-1 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-xl"
      >
        Go Home
      </Link>
    </div>
  );
}

export default NotFoundPage;
