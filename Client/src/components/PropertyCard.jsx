import React from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; 

const PropertyCard = ({ property, onEdit, onDelete, showActions }) => {
    return (
        <div className="property-card">
            <img src={property.imageUrl} alt={property.title} />
            <h2>{property.title}</h2>
            <p>{property.location}</p>
            <p>₹{property.price}</p>
            <p>{property.propertyType}</p>
            <p>{property.description}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Washrooms: {property.washrooms}</p>
            <p>Size: {property.size} sq ft</p>
            <p>Available From: {new Date(property.availableDate).toLocaleDateString()}</p> 
            {showActions && (
                <div className="property-actions">
                    <FaEdit onClick={() => onEdit(property)} style={{ cursor: 'pointer', marginRight: '10px' }} />
                    <FaTrash onClick={() => onDelete(property._id)} style={{ cursor: 'pointer' }} />
                </div>
            )}
        </div>
    );
};

export default PropertyCard;
