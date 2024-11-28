import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import ReviewsModal from './ReviewsModal'; // Import ReviewsModal component

const ProductCard = ({ product, onAddToCart }) => {
    // Default image if no images are available
    const defaultImage = 'https://via.placeholder.com/150'; // Placeholder image URL
    const price = product.price ? product.price.toFixed(2) : '0.00'; // Fallback price

    // State for managing modal visibility and reviews data
    const [showReviews, setShowReviews] = useState(false);
    const [reviews, setReviews] = useState([]);

    // Function to fetch reviews from API
    const fetchReviews = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/products/reviews/${product.id}`);
            setReviews(response.data); // Set the fetched reviews in state
            setShowReviews(true); // Show the reviews modal
        } catch (error) {
            console.error('Error fetching reviews:', error);
        }
    };

    // Toggle function for showing reviews modal
    const toggleReviews = () => {
        if (!showReviews) {
            fetchReviews(); // Fetch reviews when opening the modal
        } else {
            setShowReviews(false); // Close the modal if already open
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden flex flex-col h-full">
            {/* Main Image */}
            <img
                className="w-full h-48 object-cover"
                src={product.imageUrls && product.imageUrls.length > 0 ? product.imageUrls[0] : defaultImage} // Show the first image or default
                alt={product.name}
            />
            <div className="p-4 flex flex-col flex-grow">
                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                
                {/* Marca del producto */}
                <p className="text-gray-600 mt-2">{product.brand}</p>

                {/* Área inferior con precio y botón */}
                <div className="flex mt-auto space-x-2">
                    {/* Precio */}
                    <div className="flex-1 text-xl font-bold text-gray-900">
                        S/ {price}
                    </div>

                    {/* Botón Añadir al carrito */}
                    <button
                        onClick={() => onAddToCart(product)}
                        className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                        Añadir al carrito
                    </button>
                </div>

                {/* Button to show reviews */}
                <button
                    onClick={toggleReviews}
                    className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                >
                    Ver Reseñas
                </button>
            </div>

            {/* Reviews Modal */}
            {showReviews && (
                <ReviewsModal reviews={reviews} onClose={toggleReviews} />
            )}
        </div>
    );
};

export default ProductCard;
