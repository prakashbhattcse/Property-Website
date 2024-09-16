import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import PropertyListing from "./Pages/PropertyListing";
import CreatePropertyPage from "./Pages/createPropertyPage";

const App = () => {
  return (
    <Router>
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
