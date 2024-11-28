// ReviewsModal.jsx
import React from 'react';

const ReviewsModal = ({ reviews, onClose }) => {
    return (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h3 className="text-lg font-semibold text-gray-800">Reseñas del producto</h3>
                <div className="space-y-2 mt-2">
                    {reviews.length > 0 ? (
                        reviews.map((review) => (
                            <div key={review.id} className="p-2 border-b border-gray-300">
                                <p className="font-semibold">
                                    {review.userName} {review.userLastname}
                                </p>
                                <p>{review.comment}</p>
                                <p className="text-yellow-500">
                                    {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                                </p>
                            </div>
                        ))
                    ) : (
                        <p>No reviews available.</p>
                    )}
                </div>
                <button
                    onClick={onClose}
                    className="mt-4 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    Volver
                </button>
            </div>
        </div>
    );
};

export default ReviewsModal;
