import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white font-semibold text-2xl border-y-2 border-pallette-1 text-pallette-1 p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ARTRA. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/aboutus" className="text-pallette-100 mx-2">
            About Us
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
