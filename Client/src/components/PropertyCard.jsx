import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { FaBed, FaBath } from "react-icons/fa";
import { IoIosResize } from "react-icons/io";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./components.css";

const PropertyCard = ({ property, onDelete, showActions }) => {
  const handleEdit = () => {
    toast.info(
      "To edit this property, use the API endpoints to implement the editing functionality."
    );
  };

  return (
    <div className="property-card">
      <img src={property.imageUrl} alt={property.title} />
      <h3 style={{ textAlign: "center" }}>{property.title}</h3>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <p>{property.location}</p>
        <p>₹{property.price}/ M</p>
      </div>

      {/* <p>{property.description}</p> */}
      <p className="propertyType">{property.propertyType}</p>
      <p>Available : {new Date(property.availableDate).toLocaleDateString()}</p>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          marginTop: ".6rem",
          borderTop: "1px solid black",
        }}
      >
        <p
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <FaBed /> {property.bedrooms}
        </p>
        <p
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <FaBath /> {property.bathrooms}
        </p>
        <p
          style={{
            display: "flex",
            gap: ".5rem",
            alignItems: "center",
            paddingTop: "10px",
          }}
        >
          <IoIosResize /> {property.size} sq ft
        </p>
      </div>

      {showActions && (
        <div className="property-actions">
          <FaEdit
            onClick={handleEdit}
            style={{ cursor: "pointer", marginRight: "10px" }}
          />
          <FaTrash
            onClick={() => onDelete(property._id)}
            style={{ cursor: "pointer" }}
          />
        </div>
      )}
    </div>
  );
};

export default PropertyCard;
