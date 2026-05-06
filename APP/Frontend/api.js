/**
 * API Service for LunarCart
 * This handles communication between the React Frontend and the Express Backend.
 */

const API_URL = '/api';

const handleResponse = async (response) => {
    const data = await response.json();
    if (!response.ok || data.success === false) {
        // Throw the specific error message from the backend if available
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }
    return data;
};

export const lunarApi = {
    // Authentication
    login: async (username, password) => {
        const response = await fetch(`${API_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return handleResponse(response);
    },

    register: async (username, password) => {
        const response = await fetch(`${API_URL}/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password }),
        });
        return handleResponse(response);
    },

    // Cart Management
    getCart: async () => {
        const response = await fetch(`${API_URL}/cart`);
        return handleResponse(response);
    },

    addToCart: async (item) => {
        const response = await fetch(`${API_URL}/cart`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ item }),
        });
        return handleResponse(response);
    }
};