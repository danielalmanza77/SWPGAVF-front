import React, { useState, useEffect } from 'react';

const ProductModal = ({ product, onClose, onAddToCart }) => {
    const [currentImage, setCurrentImage] = useState('');
    const [isImageVisible, setIsImageVisible] = useState(true);
    const [quantity, setQuantity] = useState(1); // State for quantity

    useEffect(() => {
        if (product && product.imageUrls && product.imageUrls.length > 0) {
            setCurrentImage(product.imageUrls[0]); // Use imageUrls instead of imagenes
        }
    }, [product]);

    const handleMouseEnter = () => {
        setIsImageVisible(false);
        setTimeout(() => {
            if (product && product.imageUrls && product.imageUrls.length > 1) {
                setCurrentImage(product.imageUrls[1]);
            }
            setIsImageVisible(true);
        }, 200);
    };

    const handleMouseLeave = () => {
        setIsImageVisible(false);
        setTimeout(() => {
            if (product && product.imageUrls && product.imageUrls.length > 0) {
                setCurrentImage(product.imageUrls[0]);
            }
            setIsImageVisible(true);
        }, 200);
    };

    const incrementQuantity = () => {
        setQuantity(prevQuantity => {
          const newQuantity = prevQuantity + 1;
          console.log("Incremented Quantity:", newQuantity);
          return newQuantity;
        });
      };

    const decrementQuantity = () => {
        setQuantity(prevQuantity => {
          const newQuantity = Math.max(1, prevQuantity - 1);
          console.log("Decremented Quantity:", newQuantity);
          return newQuantity;
        });
    };

    const price = product && product.price ? product.price : 0;

    const handleAddToCart = () => {
        console.log("Adding product to cart:", product, "Quantity:", quantity);
        onAddToCart(product, quantity); // Add the product to the cart
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white w-1/2 h-3/4 rounded-lg p-4 flex flex-col">
                <div className="flex w-full h-full">
                    {/* Imagen del producto */}
                    <img
                        className={`w-1/2 h-full object-cover transition-opacity duration-300 ${!isImageVisible ? 'opacity-0' : 'opacity-100'}`}
                        src={currentImage || 'default-image.jpg'}
                        alt={product && product.name ? product.name : 'Product Image'}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    />
                    <div className="flex flex-col w-1/2 p-4 overflow-y-auto">
                        <h2 className="text-lg font-semibold">{product && product.name ? product.name : 'Product Name'}</h2>

                        {/* Descripción con scroll si es muy larga */}
                        <p className="text-gray-600 mt-2 flex-grow overflow-y-auto">
                            {product && product.description ? product.description : 'No description available.'}
                        </p>

                        {/* Precio */}
                        <p className="font-bold mt-4">S/ {price.toFixed(2)}</p>
                        <p className="text-gray-500">{product && product.category ? product.category : 'No category'}</p>

                        {/* Control de cantidad */}
                        <div className="flex items-center mt-4">
                            <button onClick={decrementQuantity} className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md">-</button>
                            <span className="mx-4 text-lg">{quantity}</span>
                            <button onClick={incrementQuantity} className="bg-gray-300 text-gray-600 px-2 py-1 rounded-md">+</button>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex gap-4 mt-8">
                            <button onClick={handleAddToCart} className="bg-blue-500 text-white px-6 py-2 rounded-md w-full">Añadir al carrito</button>
                            <button onClick={onClose} className="bg-red-500 text-white px-6 py-2 rounded-md w-full">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductModal;
