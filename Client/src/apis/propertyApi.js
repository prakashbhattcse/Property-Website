import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/properties';

export const createProperty = (propertyData, token) => axios.post(`${API_URL}/property`, propertyData, {
    headers: {
        'Authorization': token,
    }
});
export const getAllProperties = () => axios.get(`${API_URL}/list-properties`);
export const getPropertyById = (id) => axios.get(`${API_URL}/property/${id}`);
export const deleteProperty = (id, token) => axios.delete(`${API_URL}/property/${id}`, {
    headers: {
        'Authorization': token,
    }
});
