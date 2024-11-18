import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../api'; // API instance to interact with backend
import { useAuth } from '../context/AuthContext'; // Authentication context, if you have one

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { user } = useAuth(); // Obtiene el usuario autenticado
    const navigate = useNavigate();

    // Carga los productos desde la API cuando se monta el componente
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await API.get('/products'); // Endpoint to get products
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    // Agrega un producto al carrito
    const addToCart = (product) => {
        setCart((prevCart) => [...prevCart, product]);
    };

    // Navega al checkout y verifica si el usuario está autenticado
    const handleCheckout = () => {
        if (user) {
            navigate('/checkout');
        } else {
            navigate('/login');
        }
    };

    return (
        <div>
            <h1>Productos</h1>
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        {product.name} - ${product.price}
                        <button onClick={() => addToCart(product)}>Agregar al carrito</button>
                    </li>
                ))}
            </ul>
            <button onClick={handleCheckout}>Ir al checkout</button>
        </div>
    );
};

export default HomePage;