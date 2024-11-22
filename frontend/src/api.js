import axios from 'axios';

// Create an Axios instance with the base URL for your backend
const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

// User-related API calls
export const getUsers = () => API.get('/users'); // Fetch all users
export const createUser = (user) => API.post('/users', user); // Create a new user
export const updateUser = (id, user) => API.put(`/users/${id}`, user); // Update a user by ID
export const deleteUser = (id) => API.delete(`/users/${id}`); // Delete a user by ID

// Role-related API calls
export const getRoles = () => API.get('/roles'); // Fetch all roles
export const createRole = (role) => API.post('/roles', role); // Create a new role
export const updateRole = (id, role) => API.put(`/roles/${id}`, role); // Update a role by ID
export const deleteRole = (id) => API.delete(`/roles/${id}`); // Delete a role by ID
