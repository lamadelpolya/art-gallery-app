import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-white w-screen font-semibold text-lg border-t-4 border-pallette-1 text-pallette-1 p-2">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ARTRA. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/aboutus" className="text-pallette-100 text-lg mx-2">
            Contacts
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
