import React from 'react';

const ProductModal = ({ product, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-1/2 h-1/2 rounded-lg p-4 flex">
                <img
                    className="w-1/4 h-full object-cover rounded-l-lg"
                    src={product.images[0]} // Display the first image
                    alt={product.name}
                />
                <div className="flex flex-col justify-between p-4">
                    <div>
                        <h2 className="text-lg font-semibold">{product.name}</h2>
                        <p>{product.description}</p>
                        <p className="font-bold">${product.price}</p>
                        <p className="text-gray-500">{product.category}</p>
                    </div>
                    <div className="flex justify-between items-center">
                        <button 
                            onClick={onClose} 
                            className="bg-gray-300 text-gray-600 px-4 py-2 rounded-md">
                            Cerrar
                        </button>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
                            Añadir al carrito
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
