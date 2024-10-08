// components/Navbar.js
import React from "react";
import "./components.css";
import { useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <nav>
      <div className="navbar-container">
        {!isLoggedIn ? (
          <div>
            <button onClick={() => navigate("/")}>Home</button>
            <button onClick={() => navigate("/login")}>Login</button>
            <button onClick={() => navigate("/signup")}>Register</button>
          </div>
        ) : (
          <div>
            <button onClick={() => navigate("/create-property")}>
              Listed Properties
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
