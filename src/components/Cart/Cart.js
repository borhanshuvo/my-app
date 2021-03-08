import React from 'react';

const Cart = (props) => {
    const cart = props.cart;
    // const total = cart.reduce((total, product) => total + product.price, 0);
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
        const product = cart[i];
        total = Number((total + product.price).toFixed(2));
    }

    let shipping = 0;
    if (total > 35)
    {
        shipping = 0;
    }
    else if(total > 15)
        {
        shipping = 4.99;
    }
    else if(total > 0)
        {
        shipping = 12.99;
    }

    const tax = Number((total * 0.1).toFixed(2));
    const grandTotal = Number((total + shipping + tax).toFixed(2));
    return (
        <div>
            <h2>Order Summary</h2>
            <p>Items ordered : {cart.length}</p>
            <p><small>Product Price : {total}</small></p>
            <p><small>Shipping Cost : {shipping}</small></p>
            <p><small>Tax / Vat : {tax}</small></p>
            <p><small>Price : {grandTotal}</small></p>
        </div>
    );
};

export default Cart;