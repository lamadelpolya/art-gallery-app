import React from "react";
import { Link } from "react-router-dom";
import Image from '../assets/images/'
function HomePage() {
  return (
    <div className=" w-1/2 h-screen bg-pallette-1 flex items-center justify-center">
      <div className="text-center">
        {/* Welcome Text */}
        <div className="text-white text-[90px] font-normal  mb-10">
          Welcome to the ARTRA
        </div>

        {/* Buttons */}
        <div className="flex justify-center space-x-8">
          {/* Sign Up Button */}
          <Link
            to="/register"
            className="border border-white rounded-[60px] text-white text-[25px] font-semibold px-10 py-4 "
          >
            Sign Up
          </Link>

          {/* Sign In Button */}
          <Link
            to="/login"
            className="border border-white rounded-[60px] text-white text-[25px] font-semibold px-10 py-4 f"
          >
            Sign In
          </Link>
        </div>
      </div>
      
    </div>
    
  );
}

export default HomePage;
