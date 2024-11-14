import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import API from '../api';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await API.get('/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

    const handleAddToCart = (product) => {
        setCart([...cart, product]);
    };

    return (
        <div>
            <h2>Product Catalog</h2>
            {products.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
            ))}
        </div>
    );
};

export default ProductList;