import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";

const CreatePropertyPage = () => {
  const navigate = useNavigate();
  const [userProperties, setUserProperties] = useState([]);

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        `http://localhost:3000/api/v1/properties/property/${propertyId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Refetch properties after deletion
      fetchUserProperties();
    } catch (error) {
      console.error("Error deleting property:", error);
      alert("Error deleting property. Please try again.");
    }
  };

  const fetchUserProperties = async () => {
    try {
      const token = localStorage.getItem("token"); // Get the token from localStorage
      if (!token) {
        console.error("Token is missing, redirecting to login");
        return;
      }

      // Make the request without 'Bearer'
      const response = await axios.get(
        "http://localhost:3000/api/v1/properties/user-properties",
        {
          headers: {
            Authorization: token, // No 'Bearer' prefix, using just the token
          },
        }
      );

      // Set the user properties from the response data
      setUserProperties(response.data);
    } catch (error) {
      console.error("Error fetching user properties:", error);

      // If the error is a 401 Unauthorized, handle it by logging out the user
      if (error.response?.status === 401) {
        alert("Unauthorized request. Please log in again.");
        localStorage.removeItem("token");
        navigate("/login"); // Redirect to login
      } else {
        alert(
          "Unexpected error occurred while fetching properties. Please try again."
        );
      }
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  return (
    <div className="listedProperties-container">
      <div className="navbar-container">
        <button onClick={() => navigate("/")}>Back to Listings</button>
      </div>
      <div style={{ width: "95%", marginTop: "2rem" }}>
        <h2>Your Listed Properties</h2>
        <div className="user-property-list">
          {userProperties.map((property) => (
            <PropertyCard
              key={property._id}
              property={property}
              onDelete={handleDelete}
              showActions={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreatePropertyPage;
