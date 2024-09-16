import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PropertyListing from "./Pages/PropertyListing";

import Navbar from "./components/Navbar";
import CreatePropertyPage from "./Pages/createPropertyPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status on page load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<PropertyListing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/create-property" element={<CreatePropertyPage />} />
      </Routes>
    </Router>
  );
};

export default App;
