import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/properties';

// Utility function to get the token from localStorage
const getToken = () => localStorage.getItem('token');

// Create a new property
export const createProperty = async (propertyData) => {
    try {
        const token = getToken();
        const response = await axios.post(`${API_URL}/property`, propertyData, {
            headers: {
                'Authorization': token,
            },
        });
        console.log('Property created:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to create property:', error);
        alert('Failed to create property.');
        throw error;
    }
};

// Get all properties
export const getAllProperties = async () => {
    try {
        const response = await axios.get(`${API_URL}/list-properties`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch properties:', error);
        alert('Failed to fetch properties.');
        throw error;
    }
};

// Get property by ID
export const getPropertyById = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/property/${id}`);
        return response.data;
    } catch (error) {
        console.error('Failed to fetch property:', error);
        alert('Failed to fetch property.');
        throw error;
    }
};

// Delete a property
export const deleteProperty = async (id) => {
    try {
        const token = getToken();
        const response = await axios.delete(`${API_URL}/property/${id}`, {
            headers: {
                'Authorization': token,
            },
        });
        console.log('Property deleted:', response.data);
        return response.data.message;
    } catch (error) {
        console.error('Failed to delete property:', error);
        alert('Failed to delete property.');
        throw error;
    }
};

// Get properties for the current user
export const getUserProperties = async () => {
    try {
        const token = getToken();
        const response = await axios.get(`${API_URL}/user-properties`, {
            headers: {
                'Authorization': token,
            },
        });
        return response.data;
    } catch (error) {
        console.error('Failed to fetch user properties:', error);
        alert('Failed to fetch user properties.');
        throw error;
    }
};

// Update a property
export const updateProperty = async (id, propertyData) => {
    try {
        const token = getToken();
        const response = await axios.put(`${API_URL}/property/${id}`, propertyData, {
            headers: {
                'Authorization': token,
            },
        });
        console.log('Property updated:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to update property:', error);
        alert('Failed to update property.');
        throw error;
    }
};
