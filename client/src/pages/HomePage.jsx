import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="flex w-full  flex-grow h-[690px] bg-white">
      
      {/* Left Side: Text and Buttons */}
      <div className="w-1/2 bg-pallette-1 flex items-center justify-center">
        <div className="text-center">
          {/* Welcome Text */}
          <div className="text-white text-[70px] font-normal mb-10">
            Welcome to the ARTRA
          </div>

          {/* Buttons */}
          <div className="flex justify-center space-x-8">
            {/* Sign Up Button */}
            <Link
              to="/register"
              className="border border-white rounded-[60px] text-white text-[25px] font-semibold px-10 py-4"
            >
              Sign Up
            </Link>

            {/* Sign In Button */}
            <Link
              to="/login"
              className="border border-white rounded-[60px] text-white text-[25px] font-semibold px-10 py-4"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
      
      {/* Right Side: Background Image */}
      <div
        className="w-1/2  bg-cover bg-center"
        style={{ backgroundImage: `url('/src/assets/image.png')` }}
      ></div>
    </div>
  );
}

export default HomePage;
