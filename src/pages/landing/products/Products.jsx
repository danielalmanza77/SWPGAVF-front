import { useState } from 'react';
import ProductCard from '../../../components/ProductCard';
import ProductFilter from '../../../components/ProductFilter';
import ProductModal from './ProductModal';

const Products = () => {
    const [filters, setFilters] = useState({
        category: 'All',
        priceRange: 1000,
    });

    const [selectedProduct, setSelectedProduct] = useState(null); // State for selected product
    const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility



    const items = [
        {
            id: 1,
            name: "iPhone16",
            description: "Foco LED de 9W, luz blanca, eficiente en energía, ideal para interiores.",
            category: "Electronics",
            price: 20.99,
            stock: 150,
            brand: "Philips",
            images: [
              "/images/ip.jpg",
              "/images/ip2.jpg"
            ]
        },
        {
            id: 2,
            name: "Foco 2",
            description: "Foco LED de 9W, luz blanca, eficiente en energía, ideal para interiores.",
            category: "Clothing",
            price: 100,
            stock: 150,
            brand: "Philips",
            images: [
              "/images/foco_led_9w_front.jpg",
              "/images/foco_led_9w_side.jpg"
            ]
        },
        {
            id: 3,
            name: "Foco 3",
            description: "Foco LED de 9W, luz blanca, eficiente en energía, ideal para interiores.",
            category: "Luminarias",
            price: 50,
            stock: 150,
            brand: "Philips",
            images: [
              "/images/foco_led_9w_front.jpg",
              "/images/foco_led_9w_side.jpg"
            ]
        }
    ];

    const filteredItems = items.filter(item => {
        const withinPriceRange = item.price <= filters.priceRange;
        const categoryMatch = filters.category === 'All' || item.category === filters.category;
        return withinPriceRange && categoryMatch;
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


    return (
        <>
            <div className='w-[80%] mx-auto py-10 flex gap-x-8'>
                <div className='w-[25%]'>
                    <ProductFilter onFilterChange={handleFilterChange} />
                </div>
                <div className="grid grid-cols-3 gap-6 w-[75%]">
                    {filteredItems.map((item) => (
                        <ProductCard key={item.id} product={item} onAddToCart={openModal} />
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
