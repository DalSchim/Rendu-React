import React from 'react';
import { useCart } from '../Providers/CartContext';


export default function Cart() {
    const { cart } = useCart();

    return (
        <div>
            <h2>Your Cart</h2>
            {cart.map((product, index) => (
                <div key={index}>
                    <h3>{product.title}</h3>
                    <img src={product.image} alt={product.title} />
                    <p>{product.price} €</p>
                </div>
            ))}
        </div>
    );
}