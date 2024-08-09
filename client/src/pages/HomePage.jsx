import { Link } from "react-router-dom";
import React from "react";
function HomePage() {
  return (
    <div>
      <h1>Welcome to ARTRA</h1>

      <Link to="/register">
        <button>Register</button>
      </Link>
    </div>
  );
}

export default HomePage;
