import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { fetchCategories, fetchProducts } from './api';
import ProductList from './ProductSelect';
import "./App.css";

const App = () => {
    const dispatch = useDispatch();
    const { categories } = useSelector((state) => state.categories);
    const { products } = useSelector((state) => state.products);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const getCategories = async () => {
            const categoriesData = await fetchCategories();
            dispatch({ type: 'SET_CATEGORIES', payload: categoriesData });
        };

        getCategories();
    }, [dispatch]);

    const fetchProductsData = async () => {
        const skip = products.length; // Get current length to determine where we have to start fetching
        const productsData = await fetchProducts(categories, skip);
        dispatch({ type: 'SET_PRODUCTS', payload: productsData.products, total: productsData.total });

        // Extract categories from products
        const uniqueCategories = [...new Set(productsData.products.map(product => product.category))];
        dispatch({ type: 'SET_CATEGORIES', payload: uniqueCategories });
    };
    useEffect(() => {
        fetchProductsData();
    }, [categories]);
    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Router>
            <div className='main-container'>
                <div className='header'>
                    <h1 style={{ textAlign: "center", paddingTop: "20px" }}>Product App</h1>
                    <input style={{ padding: "10px", marginTop: "10px", width: "50%", textAlign: "center", borderRadius: "10px", border: "none" }} type="text" onChange={handleSearch} placeholder="Search products..." />
                </div>
                <ProductList searchQuery={searchQuery} />
            </div>
        </Router>
    );
};

export default App;
