import React, { useState } from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    const [currentImage, setCurrentImage] = useState(product.images[0]);
    const [isImageVisible, setIsImageVisible] = useState(true); // Estado para controlar la visibilidad

    const handleMouseEnter = () => {
        setIsImageVisible(false); // Oculta la imagen actual
        setTimeout(() => {
            setCurrentImage(product.images[1]); // Cambia la imagen después de un tiempo
            setIsImageVisible(true); // Muestra la nueva imagen
        }, 200); // Tiempo igual a la duración de la transición
    };

    const handleMouseLeave = () => {
        setIsImageVisible(false); // Oculta la imagen actual
        setTimeout(() => {
            setCurrentImage(product.images[0]); // Cambia la imagen después de un tiempo
            setIsImageVisible(true); // Muestra la nueva imagen
        }, 200); // Tiempo igual a la duración de la transición
    };

    return (
        <div 
            className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
        >
            <img
                className={`w-full h-48 object-cover transition-opacity duration-300 ${!isImageVisible ? 'opacity-0' : 'opacity-100'}`} 
                src={currentImage}
                alt={product.name}
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">
                    {product.name}
                </h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        ${product.price}
                    </span>
                    <button 
                    onClick={() => onAddToCart(product)} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;