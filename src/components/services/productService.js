// services/productService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/products';

// Fetch all products
export const getProducts = async () => {
    try {
        const response = await axios.get(API_URL);
        return response.data; // Return the data directly
    } catch (error) {
        throw new Error('Failed to fetch products');
    }
};
