import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [orderStatus, setOrderStatus] = useState('pending');
    const [order, setOrder] = useState(null);

    const addToCart = (product, quantity) => {
        console.log("Adding to cart:", product, quantity);
        console.log("Adding to cart, current items:", cartItems);
        setCartItems(prevItems => {
            console.log("Prev Items before update:", prevItems);
            const itemExists = prevItems.find(item => item.id === product.id);
            console.log("Item exists:", itemExists);
            if (itemExists) {
                return prevItems.map(item =>
                    item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
                );
            } else {
                return [...prevItems, { ...product, quantity }];
            }
        });
    };

    const clearCart = () => setCartItems([]);

    const createOrder = async () => {
        const products = cartItems.map(item => ({
            productId: item.id,
            quantity: item.quantity,
        }));

        try {
            const response = await fetch('http://localhost:8080/orders', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    orderDate: new Date().toISOString().split('T')[0],
                    status: 'PENDING',
                    products,
                }),
            });

            const data = await response.json();
            setOrder(data);
            clearCart();
            setOrderStatus('created');
        } catch (error) {
            console.error("Failed to create order:", error);
        }
    };

    const payForOrder = async (paymentMethodId) => {
        if (!order || !order.id) return;

        try {
            const response = await fetch(`http://localhost:8080/orders/${order.id}/pay`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ paymentMethodId }),
            });

            const data = await response.json();
            if (data.status === 'succeeded') {
                setOrderStatus('succeeded');
            }
        } catch (error) {
            console.error("Payment failed:", error);
        }
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            createOrder,
            payForOrder,
            orderStatus,
            order
        }}>
            {console.log("Cart Items in context:", cartItems)}
            {children}
        </CartContext.Provider>
    );
};

export default CartContext;
