const express = require('express');
const router = express.Router();
const paypal = require('@paypal/checkout-server-sdk');
//const client = require('../config/paypal'); // Asegúrate de tener configurado tu cliente de PayPal

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
        res.json({ id: order.result.id });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear la orden de PayPal' });
    }
});

module.exports = router;