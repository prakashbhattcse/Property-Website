import axios from 'axios';

const API_URL = 'http://localhost:3000/api/v1/auth';

export const login = (credentials) => axios.post(`${API_URL}/login`, credentials);
export const signup = (userData) => axios.post(`${API_URL}/signup`, userData);