import { useState, useEffect } from "react";
import axios from "axios";
import ManageCatalogModal from "./ManageCatalogModal";

function ManageCatalog() {
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
        // Replace getProducts() with your actual API call
        const response = await axios.get('http://localhost:8080/products');
        console.log('Response from API:', response.data);
        const transformedData = response.data.map((product) => ({
          ...product,
          imageUrls: product.imageUrls.map(imageName => `https://buckimgtestdan.s3.us-east-1.amazonaws.com/${imageName}`)
        }));
        setProductos(transformedData); // Set the productos state
      } catch (err) {
        setError('Failed to fetch products'); // Set error if the fetch fails
        console.error(err);
      } finally {
        setLoading(false); // Stop loading regardless of success or failure
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

  // Function to handle viewing a product
  const handleView = (id) => {
    const product = productos.find(prod => prod.productoId === id);
    setSelectedProduct(product);
    setFormData(product);
    setModalMode('view');
    setModalOpen(true);
  };

  // Function to handle editing a product
  const handleEdit = (id) => {
    const product = productos.find(prod => prod.productoId === id);
    setSelectedProduct(product);
    setFormData(product);
    setModalMode('edit');
    setModalOpen(true);
  };

  // Function to handle deleting a product
  const handleDelete = async (id) => {

    console.log('Product ID:', id); // Check if this logs a valid id

    if (!id) {
      console.error('No ID provided!');
      return; // Prevent further execution if the ID is missing
    }


    try {
      // Make the DELETE request to your API endpoint
      const response = await axios.delete(`http://localhost:8080/products/${id}`);

      // Handle the response if needed, for example:
      console.log('Product deleted:', response.data);

      // Optionally, you might want to update your local state to remove the deleted product from the UI
      // This depends on how you're managing your product list state

    } catch (error) {
      // Handle any errors that occur during the request
      console.error('There was an error deleting the product:', error);
    }
  };


  const handleImageChange = (e) => {
    const files = e.target.files;
    if (files.length === 2) {
      setImages(Array.from(files));
    } else {
      alert("Please select exactly 2 images.");
    }
  };

  const getPresignedUrls = async (files, productId) => {
    const imageKeys = files.map((file, index) => `p${productId}i${index}`);

    try {
      const response = await axios.post('http://localhost:8080/products/presigned-urls', imageKeys);
      console.log("Presigned URLs response:", response.data);

      if (Array.isArray(response.data)) {
        return response.data;
      } else {
        console.error("Error: No URLs returned.");
        return [];
      }
    } catch (error) {
      console.error("Error getting presigned URLs:", error.response || error);
      return [];
    }
  };

  const uploadImages = async (files, presignedUrls, productId) => {
    const uploadPromises = files.map((file, index) => {
      const presignedUrl = presignedUrls[index];
      return axios.put(presignedUrl, file, { headers: { "Content-Type": file.type } });
    });

    try {
      await Promise.all(uploadPromises);

      const imageUrls = files.map((file, index) => {
        const key = `p${productId}i${index}`;
        console.log("Image Key:", key);

        return key;
      });

      console.log("Public image keys:", imageUrls);
      return imageUrls;
    } catch (error) {
      console.error("Error uploading images:", error);
      return [];
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (modalMode === 'create' && images.length === 2) {
      const productId = productos.length + 1;
      const presignedUrls = await getPresignedUrls(images, productId);
      const uploadedImageKeys = await uploadImages(images, presignedUrls, productId);

      console.log("Uploaded Image Keys before product creation:", uploadedImageKeys);

      if (uploadedImageKeys.length === 2) {
        const newProduct = {
          sku: formData.sku,
          name: formData.name, // Use English fields here
          description: formData.description,
          category: formData.category,
          stock: formData.stock,
          price: formData.price,
          brand: formData.brand,
          imageUrls: uploadedImageKeys,
          available: formData.available,
        };

        console.log("New product object to send:", newProduct);

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
    <>
      <div className="p-6 bg-white rounded-lg">
        <h1 className="text-2xl mb-6 text-sixth">Gestionar Catálogo</h1>

        {/* Loading spinner or message */}
        {loading && <div>Loading...</div>}

        {/* Error message */}
        {error && <div className="text-red-600">{error}</div>}

        <button onClick={handleCreate} className="bg-sky-600 text-white py-2 px-4 rounded mb-4">
          Añadir Producto
        </button>

        <table className="border border-gray-300 shadow-lg rounded-lg w-full bg-white">
          <thead className="bg-sky-500 text-white">
            <tr className="border-b border-sky-600">
              <th className="p-4">SKU</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Descripcion</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Marca</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.id} className="border-b border-gray-200 hover:bg-sky-50 transition duration-200">
                <td className="p-4 text-center">{producto.sku}</td>
                <td className="p-4 text-center">{producto.name}</td>
                <td className="p-4 text-center">{producto.description}</td>
                <td className="p-4 text-center">{producto.category}</td>
                <td className="p-4 text-center">{producto.stock}</td>
                <td className="p-4 text-center">${typeof producto.price === 'number' ? producto.price.toFixed(2) : 'N/A'}</td>
                <td className="p-4 text-center">{producto.brand}</td>
                <td className="p-4 flex justify-around">
                  <button className="p-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded transition duration-300" onClick={() => handleView(producto.id)}>
                    Ver
                  </button>
                  <button className="p-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded transition duration-300" onClick={() => handleEdit(producto.id)}>
                    Editar
                  </button>
                  <button className="p-2 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded transition duration-300" onClick={() => handleDelete(producto.id)}>
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <ManageCatalogModal
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
    </>
  );
}

export default ManageCatalog;
