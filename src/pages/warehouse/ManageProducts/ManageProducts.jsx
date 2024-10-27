import { useState } from "react";
import ManageProductsModal from "./ManageProductsModal";

function ManageProducts() {
  const [productos, setProductos] = useState([
    {
      productoId: 1,
      sku: "ABC123",
      nombre: "Foco LED 9W",
      descripcion: "Foco LED de 9 watts, bajo consumo y larga duracion.",
      categoria: "Iluminacion",
      stock: 100,
      precio: 12.99,
      marca: "Philips"
    },
    {
      productoId: 2,
      sku: "DEF456",
      nombre: "Panel Solar 100W",
      descripcion: "Panel solar de 100 watts, ideal para sistemas de energia renovable.",
      categoria: "Energia Solar",
      stock: 50,
      precio: 150.00,
      marca: "SunPower"
    },
    {
      productoId: 3,
      sku: "GHI789",
      nombre: "UPS 650VA",
      descripcion: "Sistema de alimentacion ininterrumpida de 650VA para proteger equipos electronicos.",
      categoria: "Electronica",
      stock: 30,
      precio: 75.50,
      marca: "APC"
    }
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({ nombre: '', descripcion: '', precio: '' });

  // Function to open the modal in create mode
  const handleCreate = () => {
    setModalMode('create');
    setFormData({ nombre: '', descripcion: '', precio: '' });
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
  const handleDelete = (id) => {
    setProductos(productos.filter((producto) => producto.productoId !== id));
  };

  // Function to close the modal
  const handleClose = () => {
    setModalOpen(false);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (modalMode === 'create') {
      const newProduct = { ...formData, productoId: Date.now() }; // Example of generating a new ID
      setProductos([...productos, newProduct]);
    } else if (modalMode === 'edit') {
      setProductos(productos.map((producto) => (producto.productoId === selectedProduct.productoId ? { ...producto, ...formData } : producto)));
    }
    handleClose();
  };

  // Function to handle changes in the form
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <>
      <div className="ml-40 mt-6">
        <button className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded mb-4 transition duration-300" onClick={handleCreate}>
          Add
        </button>
        <table className="table-fixed border border-gray-300 shadow-lg rounded-lg w-[80%] bg-white">
          <thead className="bg-sky-500 text-white">
            <tr className="border-b border-sky-600">
              <th className="p-4">Producto ID</th>
              <th className="p-4">SKU</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Categoria</th>
              <th className="p-4">Stock</th>
              <th className="p-4">Precio</th>
              <th className="p-4">Marca</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productos.map((producto) => (
              <tr key={producto.productoId} className="border-b border-gray-200 hover:bg-sky-50 transition duration-200">
                <td className="p-4 text-center">{producto.productoId}</td>
                <td className="p-4 text-center">{producto.sku}</td>
                <td className="p-4 text-center">{producto.nombre}</td>
                <td className="p-4 text-center">{producto.categoria}</td>
                <td className="p-4 text-center">{producto.stock}</td>
                <td className="p-4 text-center">${typeof producto.precio === 'number' ? producto.precio.toFixed(2) : 'N/A'}</td>
                <td className="p-4 text-center">{producto.marca}</td>
                <td className="p-4 flex justify-around">
                  <button className="p-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded transition duration-300" onClick={() => handleView(producto.productoId)}>
                    View
                  </button>
                  <button className="p-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded transition duration-300" onClick={() => handleEdit(producto.productoId)}>
                    Edit
                  </button>
                  <button className="p-2 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded transition duration-300" onClick={() => handleDelete(producto.productoId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <ManageProductsModal
            mode={modalMode}
            formData={formData}
            onClose={handleClose}
            onSubmit={handleSubmit}
            onFormChange={handleFormChange}
          />
        )}
      </div>
    </>
  );
}

export default ManageProducts;
