import React, { useState, useEffect } from 'react';
import { getAllProperties } from '../apis/propertyApi';
import PropertyCard from '../components/PropertyCard';
import Filter from '../components/Filtere';
import axios from 'axios';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showCreateForm, setShowCreateForm] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await getAllProperties();
                setProperties(response.data);
                setFilteredProperties(response.data);
            } catch (error) {
                console.error('Error fetching properties:', error);
            }
        };

        fetchProperties();

        // Check login status
        const checkLoginStatus = async () => {
            try {
            
                const response = await axios.get('http://localhost:3000/api/v1/auth/check', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}` 
                    }
                });
                setIsLoggedIn(response.data.isLoggedIn);
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    const handleFilter = (filters) => {
        setFilteredProperties(properties.filter(property => {
            const isAvailableDateValid = !filters.availableFromDate || new Date(property.availableDate) >= new Date(filters.availableFromDate);
            
            return (
                (!filters.location || property.location.includes(filters.location)) &&
                (!filters.priceRange || property.price <= parseInt(filters.priceRange)) &&
                (!filters.propertyType || property.propertyType.includes(filters.propertyType)) &&
                isAvailableDateValid
            );
        }));
    };

    const handleCreateProperty = async (propertyData) => {
        try {
            await axios.post('http://localhost:3000/api/v1/properties/property', propertyData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}` 
                }
            });
            const response = await getAllProperties();
            setProperties(response.data);
            setFilteredProperties(response.data);
            setShowCreateForm(false);
        } catch (error) {
            console.error('Error creating property:', error);
        }
    };

    return (
        <div>
            <h1>Property Listings</h1>
            <Filter onFilter={handleFilter} />
            {isLoggedIn && (
                <>
                    <button onClick={() => setShowCreateForm(!showCreateForm)}>
                        {showCreateForm ? 'Cancel' : 'Create Property'}
                    </button>
                    {showCreateForm && (
                        <div className="create-property-form">
                            <h2>Create New Property</h2>
                            <form onSubmit={(e) => {
                                e.preventDefault();
                                const formData = {
                                    title: e.target.title.value,
                                    location: e.target.location.value,
                                    price: e.target.price.value,
                                    propertyType: e.target.propertyType.value,
                                    availableDate: e.target.availableDate.value,
                                    bedrooms: e.target.bedrooms.value,
                                    bathrooms: e.target.bathrooms.value,
                                    size: e.target.size.value,
                                    description: e.target.description.value,
                                    imageUrl: e.target.imageUrl.value
                                };
                                handleCreateProperty(formData);
                            }}>
                                <label>Title:</label>
                                <input type="text" name="title" required />
                                <label>Location:</label>
                                <input type="text" name="location" required />
                                <label>Price:</label>
                                <input type="number" name="price" required />
                                <label>Property Type:</label>
                                <input type="text" name="propertyType" required />
                                <label>Available Date:</label>
                                <input type="date" name="availableDate" required />
                                <label>Bedrooms:</label>
                                <input type="number" name="bedrooms" required />
                                <label>Bathrooms:</label>
                                <input type="number" name="bathrooms" required />
                                <label>Size:</label>
                                <input type="number" name="size" required />
                                <label>Description:</label>
                                <textarea name="description" required />
                                <label>Image URL:</label>
                                <input type="text" name="imageUrl" required />
                                <button type="submit">Submit</button>
                            </form>
                        </div>
                    )}
                </>
            )}
            {!isLoggedIn && (
                <div>
                    <button onClick={() => window.location.href = '/login'}>Login</button>
                    <button onClick={() => window.location.href = '/signup'}>Register</button>
                </div>
            )}
            <div className="property-list">
                {filteredProperties.map(property => (
                    <PropertyCard key={property._id} property={property} />
                ))}
            </div>
        </div>
    );
};

export default PropertyListing;
