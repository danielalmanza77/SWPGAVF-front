import { useState } from "react";

const ProductFilter = ({onFilterChange}) => {
    const [category, setCategory] = useState("All");
    const [priceRange, setPriceRange] = useState(1000);

    const handleCategoryChange = (event) => {
        event.preventDefault();
        const newCategory = event.target.value;
        setCategory(newCategory);
        onFilterChange({ category: newCategory, priceRange });
    };

    const handlePriceChange = (event) => {
        event.preventDefault();
        const newPriceRange = Number(event.target.value);
        setPriceRange(newPriceRange);
        onFilterChange({ category, priceRange: newPriceRange });
    };

    return (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Filtros
            </h2>
            <div className="mb-4">
                <label className="block text-gray-600">Categorias</label>
                <select
                    value={category}
                    onChange={handleCategoryChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                >
                    <option value="All">Todos</option>
                    <option value="Focos LED">Focos LED</option>
                    <option value="Focos fluorescentes">Focos fluorescentes</option>
                    <option value="Bombillas inteligentes">Bombillas inteligentes</option>
                    <option value="Bombillas decorativas">Bombillas decorativas</option>
                    <option value="Paneles solares">Paneles solares</option>
                    <option value="UPSs">UPSs</option>
                    <option value="Termostatos inteligentes">Termostatos inteligentes</option>
                    <option value="Medidores de consumo eléctrico">Medidores de consumo eléctrico</option>
                    <option value="Luces de exteriores">Luces de exteriores</option>
                    <option value="Luces de emergencia">Luces de emergencia</option>
                    {/* Añade más categorías según sea necesario */}
                </select>
            </div>
            <div>
                <label className="block text-gray-600">Rango de precio</label>
                <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange}
                    onChange={handlePriceChange}
                    className="mt-1 w-full"
                />
                <span className="text-gray-600 mt-1">S/ {priceRange}</span>
            </div>
        </div>
    );
};

export default ProductFilter;
