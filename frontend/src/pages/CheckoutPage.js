import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    const handlePay = async () => {
        try {
            const { data } = await API.post('/checkout/pay', { cart });
            window.location.href = data.approvalUrl;
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    return (
        <div>
            <h2>Checkout</h2>
            {cart.map((product, index) => (
                <div key={index}>{product.name}</div>
            ))}
            <button onClick={handlePay}>Pay with PayPal</button>
        </div>
    );
};

export default CheckoutPage;