import { useState, useRef, useEffect } from "react";
import { Outlet } from "react-router-dom";

// Components
import Navbar from "./Navbar";
import Footer from "./Footer";

function AppLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <div className="flex-grow text-center text-2xl text-cyan-950">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
