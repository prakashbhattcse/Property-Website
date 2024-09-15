import React, { useState, useEffect } from 'react';
import { getAllProperties } from '../apis/propertyApi';
import PropertyCard from '../components/PropertyCard';
import Filter from "../components/Filter";
import axios from 'axios';

const PropertyListing = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await getAllProperties();
                setProperties(response);
                setFilteredProperties(response);
            } catch (error) {
                console.error('Error fetching properties:', error);
                alert('Failed to load properties.');
            }
        };

        fetchProperties();

        const checkLoginStatus = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    setIsLoggedIn(false);
                    return;
                }

                const response = await axios.get('http://localhost:3000/api/v1/auth/check', {
                    headers: {
                        'Authorization': token
                    }
                });

                if (response.data.isLoggedIn) {
                    setIsLoggedIn(true);
                } else {
                    setIsLoggedIn(false);
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                }
            } catch (error) {
                console.error('Error checking login status:', error);
                setIsLoggedIn(false);
                localStorage.removeItem('token');
                window.location.href = '/login';
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

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        window.location.href = '/login';
    };

    return (
        <div>
            {!isLoggedIn ? (
                <div>
                    <button onClick={() => window.location.href = '/login'}>Login</button>
                    <button onClick={() => window.location.href = '/signup'}>Register</button>
                </div>
            ) : (
                <div>
                    <button onClick={() => window.location.href = '/create-property'}>
                        Create Property
                    </button>
                    <button onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}

            <h1>Property Listings</h1>
            <Filter onFilter={handleFilter} />

            <div className="property-list">
                {filteredProperties.length > 0 ? (
                    filteredProperties.map(property => (
                        <PropertyCard key={property._id} property={property} />
                    ))
                ) : (
                    <p>No properties found.</p>
                )}
            </div>
        </div>
    );
};

export default PropertyListing;
