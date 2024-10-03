
const ProductCard = ({product}) => {
        return (
        <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img
                className="w-full h-48 object-cover"
                src={product.image}
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
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
