import React, { useContext, useState } from 'react';
import CartContext from '../../context/CartContext';
import { useNavigate } from 'react-router-dom'; // Use useNavigate from React Router v6
import axios from 'axios'; // Import axios

const Cart = () => {
  const { cartItems } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const navigate = useNavigate(); // Initialize navigate

  const createOrder = async () => {
    if (cartItems.length === 0) return;
  
    setLoading(true);
  
    const orderData = {
      orderDate: new Date().toISOString().split('T')[0], // Get current date in yyyy-mm-dd format
      status: "PENDING",
      products: cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };
  
    try {
      const response = await axios.post('http://localhost:8080/orders', orderData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Assuming that the server always returns an order object with an `id` field upon successful creation
      if (response.data && response.data.id) {
        // Log or handle the successful order creation
        console.log('Order successfully created:', response.data);
  
        // Show success message
        setOrderSuccess(true);
  
        // Optionally, show a message or delay before navigating
        setTimeout(() => {
          alert('Order created successfully!');
          navigate('/landing/products');
        }, 2000);
      } else {
        // If there’s no `id` in the response, it might indicate an unexpected error
        console.error('Unexpected response:', response.data);
        alert('Error creating order');
      }
    } catch (error) {
      // Log or handle the error response
      console.error('Error:', error.response || error.message);
      alert('Failed to create order');
    } finally {
      setLoading(false);
    }
  };
  
  
  

  if (cartItems.length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <p className="text-center text-lg font-semibold text-gray-600">No tienes productos en el carrito</p>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Carrito de compras</h2>
      <ul className="space-y-4">
        {cartItems.map((item) => (
          <li key={item.id} className="flex justify-between items-center p-4 border border-gray-200 rounded-lg shadow-sm">
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-sm text-gray-600">Cantidad: {item.quantity}</p>
              <p className="text-sm text-gray-600">Precio: S/ {item.price.toFixed(2)}</p>
            </div>
            <p className="text-lg font-bold text-gray-800">
              Total: S/ {(item.price * item.quantity).toFixed(2)}
            </p>
          </li>
        ))}
      </ul>
      <div className="mt-6 bg-gray-100 p-4 rounded-lg shadow-inner">
        <p className="text-xl font-bold text-gray-800">
          Total: S/ {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </p>
      </div>

      <button
        onClick={createOrder}
        className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg shadow-md hover:bg-blue-600"
        disabled={loading}
      >
        {loading ? 'Creando pedido...' : 'Crear pedido'}
      </button>

      {orderSuccess && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h3 className="text-xl font-semibold text-gray-800">Pedido creado satisfactoriamente!</h3>
            <p className="text-gray-600 mt-2">Será dirigido a al catalogo...</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
