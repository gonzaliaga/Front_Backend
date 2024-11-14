import React from 'react';

const CheckoutCancel = () => {
    return (
        <div>
            <h1>Pago Cancelado</h1>
            <p>Has cancelado el proceso de pago. Si deseas intentarlo de nuevo, vuelve a tu carrito.</p>
            <a href="/cart">Volver al carrito</a>
        </div>
    );
};

export default CheckoutCancel;