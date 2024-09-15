import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
    const [location, setLocation] = useState('');
    const [availableFromDate, setAvailableFromDate] = useState('');
    const [priceRange, setPriceRange] = useState(5000);
    const [propertyType, setPropertyType] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Pass the availableFromDate to the parent component via onFilter
        onFilter({ location, priceRange, propertyType, availableFromDate });
    };

    // Sample cities and property types
    const cities = ['New Delhi', 'Mumbai', 'Bangalore', 'Chennai', 'Hyderabad'];
    const propertyTypes = ['Apartment', 'House', 'Villa', 'Studio'];

    return (
        <form onSubmit={handleSubmit} className="filter-form">
    
            <label>Location:</label>
            <select 
                value={location} 
                onChange={(e) => setLocation(e.target.value)} 
            >
                <option value="">Select City</option>
                {cities.map((city, index) => (
                    <option key={index} value={city}>
                        {city}
                    </option>
                ))}
            </select>

     
            <label>Available From:</label>
            <input 
                type="date" 
                value={availableFromDate} 
                onChange={(e) => setAvailableFromDate(e.target.value)} 
            />

          
            <label>Price Range: ₹{priceRange}</label>
            <input 
                type="range" 
                min="1000" 
                max="200000" 
                step="1000" 
                value={priceRange} 
                onChange={(e) => setPriceRange(e.target.value)} 
            />

        
            <label>Property Type:</label>
            <select 
                value={propertyType} 
                onChange={(e) => setPropertyType(e.target.value)} 
            >
                <option value="">Select Type</option>
                {propertyTypes.map((type, index) => (
                    <option key={index} value={type}>
                        {type}
                    </option>
                ))}
            </select>

         
            <button type="submit">Apply Filters</button>
        </form>
    );
};

export default Filter;
