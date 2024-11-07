import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    // Default image if no images are available
    const defaultImage = 'https://via.placeholder.com/150'; // Placeholder image URL
    const price = product.price ? product.price.toFixed(2) : '0.00'; // Fallback price

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            {/* Main Image */}
            <img
                className="w-full h-48 object-cover"
                src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : defaultImage} // Show the first image or default
                alt={product.name}
            />
            <div className="p-4">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 mt-1">{product.description}</p>
                <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-900">
                        S/ {price}
                    </span>
                    <button
                        onClick={() => onAddToCart(product)}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Añadir al carrito
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
