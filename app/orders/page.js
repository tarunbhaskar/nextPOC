'use client';

import { useCart } from '../context/CartContext';
import '../styles/orders.css';

export default function OrdersPage() {
    const { cart, removeFromCart, clearCart } = useCart();

    const calculateTotal = () =>
        cart.reduce((total, item) => total + item.quantity * item.price, 0).toFixed(2);

    return (
        <div className="orders-container">
            <h1>Your Cart</h1>

            {cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <div className="order-list">
                        {cart.map((item, index) => (
                            <div key={index} className="order-item">
                                <h2>{item.title}</h2>
                                <p>Quantity: {item.quantity}</p>
                                <p>Price per unit: ${item.price}</p>
                                <p>Total: ${(item.quantity * item.price).toFixed(2)}</p>
                                <button onClick={() => removeFromCart(index)}>Remove</button>
                            </div>
                        ))}
                    </div>
                    <div className="order-total">
                        <h3>Total: ${calculateTotal()}</h3>
                        <button onClick={clearCart}>Clear Cart</button>
                    </div>
                </>
            )}
        </div>
    );
}
