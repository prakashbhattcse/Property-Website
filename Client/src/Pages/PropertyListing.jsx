import React, { useState, useEffect } from "react";
import { getAllProperties } from "../apis/propertyApi";
import PropertyCard from "../components/PropertyCard";
import Filter from "../components/Filter";
import axios from "axios";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import "./Pages.css"; // Import the CSS file

const PropertyListing = () => {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await getAllProperties();
        setProperties(response);
        setFilteredProperties(response);
      } catch (error) {
        console.error("Error fetching properties:", error);
        alert("Failed to load properties.");
      }
    };

    fetchProperties();

    const checkLoginStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setIsLoggedIn(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:3000/api/v1/auth/check",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (response.data.isLoggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
          localStorage.removeItem("token");
          navigate("/login");
        }
      } catch (error) {
        console.error("Error checking login status:", error);
        setIsLoggedIn(false);
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleFilter = (filters) => {
    setFilteredProperties(
      properties.filter((property) => {
        const isAvailableDateValid =
          !filters.availableFromDate ||
          new Date(property.availableDate) >=
            new Date(filters.availableFromDate);

        return (
          (!filters.location || property.location.includes(filters.location)) &&
          (!filters.priceRange ||
            property.price <= parseInt(filters.priceRange)) &&
          (!filters.propertyType ||
            property.propertyType.includes(filters.propertyType)) &&
          isAvailableDateValid
        );
      })
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div>
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
      <div className="property-listing-container">
        <div className="filter-container">
          <Filter onFilter={handleFilter} />
        </div>
        <div className="property-list">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
