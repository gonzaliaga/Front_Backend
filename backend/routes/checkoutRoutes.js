const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');
const client = require('../config/paypalClient'); // Asegúrate de tener configurado tu cliente de PayPal

// Función para calcular el total del carrito
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
}

// Ruta para iniciar el pago
router.post('/pay', async (req, res) => {
    const { cart } = req.body;

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer("return=representation");

    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: calculateTotal(cart), // Calcula el total del carrito
            },
            description: 'Purchase from React Store',
        }],
        application_context: {
            return_url: 'http://localhost:3000/checkout/success', // OJO fijarse si esta en el puerto correcto del frontend
            cancel_url: 'http://localhost:3000/checkout/cancel',  // OJO fijarse si esta en el puerto correcto del frontend
        }
    });

    try {
        const order = await client.execute(request);
        res.json({ approvalUrl: order.result.links.find(link => link.rel === 'approve').href });
    } catch (error) {
        console.error('Error creating PayPal order:', error);
        res.status(500).send('Error initiating PayPal payment');
    }
});

// Ruta para capturar el pago
router.get('/capture', async (req, res) => {
    const { token } = req.query;

    const request = new paypal.orders.OrdersCaptureRequest(token);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        res.send("Payment completed successfully");
    } catch (error) {
        console.error('Error capturing PayPal payment:', error);
        res.status(500).send("Error capturing payment");
    }
});

module.exports = router;