import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-pallette-400 text-pallette-200 p-4">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ARTRA. All rights reserved.</p>
        <div className="mt-2">
          <Link to="/aboutus" className="text-pallette-100 mx-2">About Us</Link>
        </div>
        <p className="mt-2">Contact us at: <a href="mailto:muse.artra@gmail.com" className="text-pallette-100">muse.artra@gmail.com</a></p>
      </div>
    </footer>
  );
}

export default Footer;
