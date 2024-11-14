import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import API from '../api'; // API instance to interact with backend
import { useAuth } from '../context/AuthContext'; // Authentication context, if you have one

const HomePage = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const { user } = useAuth(); // Obtiene el usuario autenticado
    const history = useHistory();

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
        if (!user) {
            history.push('/login'); // Redirige al login si el usuario no está autenticado
        } else {
            history.push('/checkout'); // Redirige al checkout si está autenticado
        }
    };

    return (
        <div>
            <h1>Catálogo de Productos</h1>
            <div className="product-list">
                {products.map((product) => (
                    <div key={product._id} className="product-item">
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <p>${product.price.toFixed(2)}</p>
                        <button onClick={() => addToCart(product)}>Añadir al carrito</button>
                    </div>
                ))}
            </div>
            <button onClick={handleCheckout}>Ir al Checkout</button>
            <Link to="/cart">Ver carrito ({cart.length} productos)</Link>
        </div>
    );
};

export default HomePage;