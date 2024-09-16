import React, { useState, useEffect } from "react";
import axios from "axios";
import PropertyCard from "../components/PropertyCard";
import { useNavigate } from "react-router-dom";

const CreatePropertyPage = () => {
  const navigate = useNavigate();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [userProperties, setUserProperties] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    propertyType: "",
    availableDate: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    description: "",
    imageUrl: "",
  });
  const [editingProperty, setEditingProperty] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCreateOrUpdateProperty = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create or update a property");
        navigate("/login");
        return;
      }

      if (editingProperty) {
        // Update property
        await axios.put(
          "http://localhost:3000/api/v1/properties/property/${editingProperty._id}",
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        // Create new property
        await axios.post(
          "http://localhost:3000/api/v1/properties/property",
          formData,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      // Fetch the user's properties after creation or update
      fetchUserProperties();
      setShowCreateForm(false);
      setEditingProperty(null);
      setFormData({
        title: "",
        location: "",
        price: "",
        propertyType: "",
        availableDate: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        description: "",
        imageUrl: "",
      });
    } catch (error) {
      console.error("Error creating or updating property:", error);
      if (error.response?.status === 401) {
        alert("Unauthorized request. Please log in again.");
        localStorage.removeItem("token");
        navigate("/");
      }
    }
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setFormData({
      title: property.title,
      location: property.location,
      price: property.price,
      propertyType: property.propertyType,
      availableDate: property.availableDate,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      size: property.size,
      description: property.description,
      imageUrl: property.imageUrl,
    });
    setShowCreateForm(true);
  };

  const handleDelete = async (propertyId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(
        "http://localhost:3000/api/v1/properties/property/${propertyId}",
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
        console.error("Unexpected error occurred:", error.message);
      }
    }
  };

  useEffect(() => {
    fetchUserProperties();
  }, []);

  return (
    <div>
      <button onClick={() => navigate("/")}>Back to Listings</button>

      <h2>Your Listed Properties</h2>
      <div className="user-property-list">
        {userProperties.map((property) => (
          <PropertyCard
            key={property._id}
            property={property}
            onEdit={handleEdit}
            onDelete={handleDelete}
            showActions={true}
          />
        ))}
      </div>

      <button onClick={() => setShowCreateForm(!showCreateForm)}>
        {showCreateForm
          ? "Cancel"
          : editingProperty
          ? "Update Property"
          : "Create Property"}
      </button>

      {showCreateForm && (
        <div className="create-property-form">
          <h2>{editingProperty ? "Update Property" : "Create New Property"}</h2>
          <form onSubmit={handleCreateOrUpdateProperty}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
            <label>Location:</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              required
            />
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              required
            />
            <label>Property Type:</label>
            <input
              type="text"
              name="propertyType"
              value={formData.propertyType}
              onChange={handleInputChange}
              required
            />
            <label>Available Date:</label>
            <input
              type="date"
              name="availableDate"
              value={formData.availableDate}
              onChange={handleInputChange}
              required
            />
            <label>Bedrooms:</label>
            <input
              type="number"
              name="bedrooms"
              value={formData.bedrooms}
              onChange={handleInputChange}
              required
            />
            <label>Bathrooms:</label>
            <input
              type="number"
              name="bathrooms"
              value={formData.bathrooms}
              onChange={handleInputChange}
              required
            />
            <label>Size:</label>
            <input
              type="number"
              name="size"
              value={formData.size}
              onChange={handleInputChange}
              required
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <label>Image URL:</label>
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleInputChange}
              required
            />
            <button type="submit">
              {editingProperty ? "Update" : "Submit"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CreatePropertyPage;
