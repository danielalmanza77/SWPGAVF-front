import React, { useState, useEffect, useContext } from 'react';
import ProductCard from '../../../components/ProductCard';
import ProductFilter from '../../../components/ProductFilter';
import ProductModal from './ProductModal';
import { getProducts } from '../../../components/services/productService';
import CartContext from '../../../context/CartContext';  // Import CartContext

const Products = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 1000,
    });

    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { cartItems, addToCart } = useContext(CartContext);  // Use CartContext

    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                const transformedData = data.map((product) => ({
                    ...product,
                    imageUrls: product.imageUrls.map(imageName => `https://buckimgtestdan.s3.us-east-1.amazonaws.com/${imageName}`)
                }));
                setItems(transformedData);
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter to show only available products (item.available === true)
    const filteredItems = items.filter(item => {
        const withinPriceRange = item.price <= filters.priceRange;
        const categoryMatch = filters.category === 'All' || item.category === filters.category;
        const availabilityMatch = item.available === true;  // Only show available products
        return withinPriceRange && categoryMatch && availabilityMatch;
    });

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    const handleAddToCart = (product, quantity) => {
        addToCart(product, quantity);  // Use addToCart from context
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className='w-[90%] mx-auto py-10 flex gap-x-8'>
                <div className='w-[25%]'>
                    <ProductFilter onFilterChange={handleFilterChange} />
                    <div className="w-full p-4 bg-white rounded-md shadow-md mt-6">
                        <h2>Carrito:</h2>
                        <ul>
                            {cartItems.length === 0 ? (
                                <li>Aún no has agregado productos</li>
                            ) : (
                                cartItems.map((item, index) => (
                                    <li key={index} className='shadow-md rounded-md mb-1'>
                                        {item.name} <br /> {item.quantity} und
                                    </li>
                                ))
                            )}
                        </ul>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-6 w-[75%]">
                    {filteredItems.map((item) => (
                        <ProductCard
                            key={item.id}
                            product={item}
                            onAddToCart={openModal}
                        />
                    ))}
                </div>
            </div>


            {isModalOpen && selectedProduct && (
                <ProductModal
                    product={selectedProduct}
                    onClose={closeModal}
                    onAddToCart={handleAddToCart}
                />
            )}
        </>
    );
};

export default Products;
