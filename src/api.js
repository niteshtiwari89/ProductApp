import axios from 'axios';

const API_URL = 'https://dummyjson.com/products';

export const fetchCategories = async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
};

export const fetchProducts = async (category, skip) => {
    const response = await axios.get(API_URL, {
        params: { category, skip, limit: 30 },
    });
    return response.data;
};
