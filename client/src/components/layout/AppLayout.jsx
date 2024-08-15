import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";
import backgroundImage from "../../assets/images/image.png";
function AppLayout() {
  return (
    <div className="flex min-h-screen  bg-pallette-1 flex-col">
      <Navbar />
      <div className="flex-grow text-center text-2xl">
        <div className=" bg-pallette-1 p-6">
          
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
