import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false); 
  const [isProcessingPayment, setIsProcessingPayment] = useState(false); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:8080/orders');
        console.log('Fetched Orders:', response.data);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Failed to fetch orders');
      }
    };
    fetchOrders();
  }, []);

  const handlePay = (order) => {
    setSelectedOrder(order); // Store the entire order
    setIsPayModalOpen(true); // Open Pay modal
  };

  const handlePaymentSubmit = async () => {
    if (!selectedOrder) return;
    setIsProcessingPayment(true);

    try {
      const paymentMethodId = 'pm_card_visa';
      const response = await axios.post(`http://localhost:8080/orders/${selectedOrder.id}/pay`, { paymentMethodId });

      if (response.status === 200) {
        alert('Payment processed successfully!');
        setIsPayModalOpen(false); // Close Pay modal

        window.location.reload();
      }
    } catch (error) {
      alert('Error processing payment');
      console.error(error);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const openModal = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const closePayModal = () => {
    setIsPayModalOpen(false);
    setSelectedOrder(null);  // Optionally clear selected order
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-6">Tus Pedidos</h2>
      {orders.length === 0 ? (
        <p className="text-center text-gray-500">No tienes pedidos aún.</p>
      ) : (
        <ul>
          {orders.map((order) => (
            <li key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4 p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Pedido ID: {order.id}</h3>
                  <p className="text-sm text-gray-600">Fecha: {order.orderDate}</p>
                  <p className="text-sm text-gray-600">Estado: {order.status}</p>
                  <p className="text-sm text-gray-600">
                    Monto: S/ {order.amount !== undefined ? (order.amount / 100).toFixed(2) : '0.00'}
                  </p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
                    onClick={() => handlePay(order)} 
                  >
                    Pagar
                  </button>
                  <button
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg ml-2 hover:bg-gray-600 transition"
                    onClick={() => openModal(order)}
                  >
                    Detalle
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}

      {/* Order Details Modal */}
      {isModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">Detalle</h3>
            <div>
              <h4 className="font-semibold text-lg">Productos:</h4>
              <ul>
                {selectedOrder.products && selectedOrder.products.length > 0 ? (
                  selectedOrder.products.map((product) => (
                    <li key={product.id} className="flex justify-between mb-4">
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-600">Cantidad: {product.quantity}</p>
                        <p className="text-sm text-gray-600">Precio: S/ {product.price ? product.price.toFixed(2) : '0.00'}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">S/ {(product.price * product.quantity).toFixed(2)}</p>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>Pedido sin producto.</p>
                )}
              </ul>
              <p className="mt-4 text-lg font-semibold">
                Total: S/ {selectedOrder.amount ? (selectedOrder.amount / 100).toFixed(2) : '0.00'}
              </p>
            </div>
            <div className="mt-6 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={closeModal}
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Modal */}
      {isPayModalOpen && selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
            <h3 className="text-2xl font-semibold mb-4">Confirm Payment</h3>
            <p className="text-lg">Monto: S/ {selectedOrder.amount ? selectedOrder.amount.toFixed(2) : '0.00'}</p>

            {/* Fake Debit Card Form with Placeholders */}
            <div className="mt-6">
              <label className="block text-sm font-semibold mb-2">Tarjeta:</label>
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                placeholder="4*** **** **** ****" // Fake debit card number
              />
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2">Nombre:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="Nombre"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2">Apellidos:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4"
                    placeholder="Apellidos"
                  />
                </div>
              </div>
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2">Fecha de vencimiento:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="12/25"
                  />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-semibold mb-2">CVV:</label>
                  <input
                    type="text"
                    className="w-full p-2 border border-gray-300 rounded-lg"
                    placeholder="123"
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 flex justify-between">
              <button
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                onClick={closePayModal}
              >
                Cerrar
              </button>
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                onClick={handlePaymentSubmit}
                disabled={isProcessingPayment}
              >
                {isProcessingPayment ? 'Procesando...' : 'Pagar ahora'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
