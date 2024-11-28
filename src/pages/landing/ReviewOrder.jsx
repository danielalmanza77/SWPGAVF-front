import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ReviewOrder = () => {

    const location = useLocation();
    console.log('Current location:', location);
    const { state } = useLocation();
    console.log('State:', state);
    const { products = [] } = state || {};
    console.log('Products:', products);  // Log products to check if the data is coming through

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
        setComment('');
        setRating(1);
    };

    const handleSave = async () => {
        if (!selectedProduct) return;

        try {
            // Call your backend to save the review (use appropriate endpoint)
            const response = await axios.post('http://localhost:8080/reviews', {
                productId: selectedProduct.id,
                comment,
                rating,
            });

            if (response.status === 200) {
                alert('Reseña guardada correctamente.');
                closeModal();
            }
        } catch (error) {
            console.error('Error saving review:', error);
            alert('Error al guardar la reseña.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-6">Agregar Reseñas</h2>
            {products.length === 0 ? (
                <p>No hay productos para reseñar.</p>
            ) : (
                <table className="table-auto w-full border-collapse border border-gray-200 shadow-lg">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Nombre</th>
                            <th className="border border-gray-300 px-4 py-2">Precio</th>
                            <th className="border border-gray-300 px-4 py-2">Acción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product) => (
                            <tr key={product.id}>
                                <td className="border border-gray-300 px-4 py-2">{product.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{product.name}</td>
                                <td className="border border-gray-300 px-4 py-2">
                                    S/ {product.price.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                        onClick={() => openModal(product)}
                                    >
                                        Agregar Reseña
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Review Modal */}
            {isModalOpen && selectedProduct && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
                        <h3 className="text-2xl font-semibold mb-4">Agregar Reseña</h3>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Comentario:</label>
                            <textarea
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Escribe tu comentario aquí..."
                                rows="4"
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-sm font-semibold mb-2">Calificación:</label>
                            <select
                                className="w-full p-2 border border-gray-300 rounded-lg"
                                value={rating}
                                onChange={(e) => setRating(Number(e.target.value))}
                            >
                                {[1, 2, 3, 4, 5].map((rate) => (
                                    <option key={rate} value={rate}>
                                        {rate} - {rate === 1 ? 'Muy Malo' : rate === 5 ? 'Excelente' : 'Bueno'}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="mt-6 flex justify-between">
                            <button
                                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
                                onClick={closeModal}
                            >
                                Cerrar
                            </button>
                            <button
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
                                onClick={handleSave}
                            >
                                Guardar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ReviewOrder;
