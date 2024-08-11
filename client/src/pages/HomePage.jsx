import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="container mx-auto text-center mt-20">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Art Gallery!</h1>
      <div className="space-x-4">
        <Link
          to="/register"
          className="btn bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
