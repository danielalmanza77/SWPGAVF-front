import React, { useState } from 'react';

const ProductModal = ({ product, onClose }) => {
    const [currentImage, setCurrentImage] = useState(product.imagenes[0]);
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [quantity, setQuantity] = useState(1); // State for quantity

    const handleMouseEnter = () => {
        setIsImageVisible(false);
        setTimeout(() => {
            setCurrentImage(product.imagenes[1]);
            setIsImageVisible(true);
        }, 200);
    };

    const handleMouseLeave = () => {
        setIsImageVisible(false);
        setTimeout(() => {
            setCurrentImage(product.imagenes[0]);
            setIsImageVisible(true);
        }, 200);
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => Math.max(1, prevQuantity - 1)); // Prevent going below 1
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-1/2 h-1/2 rounded-lg p-4 flex">
                <img
                    className={`w-1/2 h-full object-cover transition-opacity duration-300 ${!isImageVisible ? 'opacity-0' : 'opacity-100'}`}
                    src={currentImage}
                    alt={product.nombre}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                />
                <div className="flex flex-col justify-between p-4">
                    <div>
                        <h2 className="text-lg font-semibold">{product.nombre}</h2>
                        <p>{product.descripcion}</p>
                        <p className="font-bold">S/ {product.precio.toFixed(2)}</p>
                        <p className="text-gray-500">{product.categoria}</p>
                    </div>
                    <div className="flex items-center mt-4">
                        <button onClick={decrementQuantity} className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md">-</button>
                        <span className="mx-4 text-lg">{quantity}</span>
                        <button onClick={incrementQuantity} className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md">+</button>
                    </div>
                    <div className="flex justify-between items-center mt-4">
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
