import React from 'react';

const PropertyCard = ({ property }) => {
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
        </div>
    );
};

export default PropertyCard;
