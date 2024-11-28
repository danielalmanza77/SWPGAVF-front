import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageDelivery = () => {
    const [orders, setOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

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

    const handleMarkAsDelivered = async (order) => {
        try {
            const response = await axios.put(`http://localhost:8080/orders/${order.id}/status?status=DELIVERED`);
            if (response.status === 200) {
                alert('Order marked as delivered!');
                // Update orders state to reflect the status change
                setOrders((prevOrders) =>
                    prevOrders.map((o) => 
                        o.id === order.id ? { ...o, status: 'DELIVERED' } : o
                    )
                );
            }
        } catch (error) {
            console.error('Error updating order status:', error);
            alert('Failed to mark order as delivered');
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

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-3xl font-bold text-center mb-6">Gestionar Entregas</h2>

            <div className="flex justify-between">
                {/* Left side - Paid Orders */}
                <div className="w-1/2 pr-4">
                    <h3 className="text-2xl font-semibold mb-4">Pedidos a Entregar</h3>
                    {orders.filter((order) => order.status === 'PAID').length === 0 ? (
                        <p>No hay pedidos pagados.</p>
                    ) : (
                        <ul>
                            {orders.filter((order) => order.status === 'PAID').map((order) => (
                                <li key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4 p-6">
                                    {/* Order info */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">Pedido ID: {order.id}</h3>
                                            <p className="text-sm text-gray-600">Fecha: {order.orderDate}</p>
                                            <p className="text-sm text-gray-600">Estado: {order.status}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-green-500 text-white py-2 px-4 rounded-lg"
                                                onClick={() => handleMarkAsDelivered(order)}
                                            >
                                                Entregado
                                            </button>
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                onClick={() => openModal(order)}
                                            >
                                                Detalles
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                {/* Right side - Delivered Orders */}
                <div className="w-1/2 pl-4">
                    <h3 className="text-2xl font-semibold mb-4">Pedidos Entregados</h3>
                    {orders.filter((order) => order.status === 'DELIVERED').length === 0 ? (
                        <p>No hay pedidos entregados.</p>
                    ) : (
                        <ul>
                            {orders.filter((order) => order.status === 'DELIVERED').map((order) => (
                                <li key={order.id} className="bg-white border border-gray-200 rounded-lg shadow-lg mb-4 p-6">
                                    {/* Order info */}
                                    <div className="flex justify-between items-center mb-4">
                                        <div>
                                            <h3 className="text-xl font-semibold">Pedido ID: {order.id}</h3>
                                            <p className="text-sm text-gray-600">Fecha: {order.orderDate}</p>
                                            <p className="text-sm text-gray-600">Estado: {order.status}</p>
                                        </div>
                                        <div className="flex space-x-2">
                                            <button
                                                className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                                                onClick={() => openModal(order)}
                                            >
                                                Detalles
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

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
        </div>
    );
};

export default ManageDelivery;
