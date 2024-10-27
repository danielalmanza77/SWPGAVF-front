import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../../../components/ProductCard';
import ProductFilter from '../../../components/ProductFilter';
import ProductModal from './ProductModal';

const Products = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 1000,
    });

    // State for selected product
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    // State for modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false); 
    
    // State for products and loading state
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch products from API
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get("http://localhost:8080/products"); // Replace with your API endpoint
                console.log(response.data);
                setItems(response.data); // Assuming your API returns an array of products
            } catch (err) {
                setError('Failed to fetch products');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    // Filter items based on selected filters
    const filteredItems = items.filter(item => {
        const withinPriceRange = item.precio <= filters.priceRange;
        const categoryMatch = filters.category === 'All' || item.categoria === filters.category;
        return withinPriceRange && categoryMatch;
    });

    const handleFilterChange = (newFilters) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            ...newFilters,
        }));
    };

    // Modal functions
    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <>
            <div className='w-[90%] mx-auto py-10 flex gap-x-8'>
                <div className='w-[25%]'>
                    <ProductFilter onFilterChange={handleFilterChange} />
                </div>
                <div className="grid grid-cols-3 gap-6 w-[75%]">
                    {filteredItems.map((item) => (
                        <ProductCard 
                            key={item.productoId} // Use productoId as key
                            product={{
                                id: item.productoId,
                                sku: item.sku,
                                nombre: item.nombre,
                                categoria: item.categoria,
                                descripcion: item.descripcion,
                                marca: item.marca,
                                precio: item.precio,
                                stock: item.stock,
                                imagenes: item.imagenes
                            }} 
                            onAddToCart={openModal} 
                        />
                    ))}
                </div>
            </div>
            {isModalOpen && selectedProduct && (
                <ProductModal product={selectedProduct} onClose={closeModal} />
            )}
        </>
    );
};

export default Products;
