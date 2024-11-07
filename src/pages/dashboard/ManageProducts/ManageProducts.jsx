import axios from "axios";
import { useEffect, useState } from "react";
import ManageProductsModal from "./ManageProductsModal";

function ManageProducts() {
  const [productos, setProductos] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    imageUrls: []
  });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(''); // Add error state

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/products');
        const transformedData = response.data.map((product) => ({
          ...product,
          imageUrls: product.imageUrls.map(imageName => `https://buckimgtestdan.s3.us-east-1.amazonaws.com/${imageName}`)
        }));
        setProductos(transformedData); // Set the productos state
      } catch (err) {
        setError('Failed to fetch products');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // Only run this effect once when the component mounts

  const handleCreate = () => {
    setModalMode('create');
    setFormData({ nombre: '', descripcion: '', precio: '', imageUrls: [] });
    setImages([]);
    setModalOpen(true);
  };

  // Function to handle toggling availability
  const handleToggleAvailability = async (id, currentAvailability) => {
    try {
      const updatedAvailability = !currentAvailability;

      // Update availability on the server (POST request)
      await axios.post(`http://localhost:8080/products/${id}/availability`, null, {
        params: { available: updatedAvailability }
      });

      // After the update, reload the products
      const updatedProducts = productos.map(product => {
        if (product.id === id) {
          return { ...product, available: updatedAvailability };
        }
        return product;
      });
      setProductos(updatedProducts); // Update local state to reflect the change
    } catch (error) {
      console.error("Error toggling availability:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalMode === 'create' && images.length === 2) {
      const productId = productos.length + 1;
      const presignedUrls = await getPresignedUrls(images, productId);
      const uploadedImageKeys = await uploadImages(images, presignedUrls, productId);

      if (uploadedImageKeys.length === 2) {
        const newProduct = {
          sku: formData.sku,
          name: formData.name,
          description: formData.description,
          category: formData.category,
          stock: formData.stock,
          price: formData.price,
          brand: formData.brand,
          imageUrls: uploadedImageKeys,
          available: formData.available,
        };

        try {
          const response = await axios.post('http://localhost:8080/products', newProduct);
          if (response.status === 201) {
            setProductos([...productos, response.data]);
            handleClose();
          } else {
            console.error('Failed to create product');
          }
        } catch (error) {
          console.error("Error creating product:", error);
        }
      }
    } else if (modalMode === 'edit') {
      setProductos(productos.map((producto) =>
        (producto.productoId === selectedProduct.productoId ? { ...producto, ...formData } : producto)
      ));
      handleClose();
    }
  };

  const handleClose = () => {
    setModalOpen(false);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="text-sixth text-2xl mb-6">Gestionar Productos</h1>

      {loading && <div>Loading...</div>}
      {error && <div className="text-red-600">{error}</div>}
      {/* 
        No added needed
      <button onClick={handleCreate} className="bg-sky-600 text-white py-2 px-4 rounded">
        Add Product
      </button> */}

      <table className="border border-gray-300 shadow-lg rounded-lg w-full bg-white">
        <thead className="bg-sky-500 text-white">
          <tr className="border-b border-sky-600">
            <th className="p-4">SKU</th>
            <th className="p-4">Nombre</th>
            {/* <th className="p-4">Descripcion</th> */}
            <th className="p-4">Categoria</th>
            <th className="p-4">Stock</th>
            <th className="p-4">Precio</th>
            <th className="p-4">Marca</th>
            <th className="p-4">Disponibilidad</th> {/* Added column for availability */}
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-b border-gray-200 hover:bg-sky-50 transition duration-200">
              <td className="p-4 text-center">{producto.sku}</td>
              <td className="p-4 text-center">{producto.name}</td>
              {/* <td className="p-4 text-center">{producto.description}</td> */}
              <td className="p-4 text-center">{producto.category}</td>
              <td className="p-4 text-center">{producto.stock}</td>
              <td className="p-4 text-center">S/ {producto.price.toFixed(2)}</td>
              <td className="p-4 text-center">{producto.brand}</td>
              <td className="p-4 text-center">
                <div className="flex flex-col items-center">
                  {/* Display current availability status */}
                  <span className={`font-semibold ${producto.available ? 'text-black' : 'text-red-600'}`}>
                    {producto.available ? 'Disponible' : 'No Disponible'}
                  </span>
                  {/* Toggle Switch for Availability */}
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={producto.available}
                      onChange={() => handleToggleAvailability(producto.id, producto.available)}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-sky-300 dark:peer-focus:ring-sky-800 rounded-full peer dark:bg-gray-700 peer-checked:bg-sky-600 transition-colors duration-300 ease-in-out"></div>
                    <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full shadow-md peer-checked:translate-x-5 peer-checked:bg-white transition-transform duration-300 ease-in-out"></div>
                  </label>
                </div>
              </td>
              <td className="p-4 flex justify-around">
                <button className="p-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded transition duration-300" onClick={() => handleView(producto.id)}>
                  Ver
                </button>
                <button className="p-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded transition duration-300" onClick={() => handleEdit(producto.id)}>
                  Editar
                </button>

                {/* <button className="p-2 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded transition duration-300" onClick={() => handleDelete(producto.id)}>
                  Eliminar
                </button>
               */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <ManageProductsModal
          mode={modalMode}
          formData={formData}
          images={images}
          onClose={handleClose}
          onSubmit={handleSubmit}
          onFormChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
          onImageChange={handleImageChange}
        />
      )}
    </div>
  );
}

export default ManageProducts;
