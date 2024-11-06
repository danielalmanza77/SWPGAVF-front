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
  const [formData, setFormData] = useState({ 
    sku: '', 
    nombre: '', 
    descripcion: '', 
    categoria: '', 
    stock: '', 
    precio: '', 
    marca: '' 
  });
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [validationErrors, setValidationErrors] = useState({});

  const showNotification = (message, type = 'error') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 10000);
  };

  const handleCreate = () => {
    setModalMode('create');
    setFormData({ 
      sku: '', 
      nombre: '', 
      descripcion: '', 
      categoria: '', 
      stock: '', 
      precio: '', 
      marca: '' 
    });
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleView = (id) => {
    const product = productos.find(prod => prod.productoId === id);
    setSelectedProduct(product);
    setFormData(product);
    setModalMode('view');
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const product = productos.find(prod => prod.productoId === id);
    setSelectedProduct(product);
    setFormData(product);
    setModalMode('edit');
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const product = productos.find(prod => prod.productoId === id);
    setSelectedProduct(product);
    setModalMode('delete');
    setModalOpen(true);
  };

  const confirmDelete = () => {
    setProductos(productos.filter((producto) => producto.productoId !== selectedProduct.productoId));
    showNotification('Producto eliminado correctamente', 'success');
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['sku', 'nombre', 'descripcion', 'categoria', 'stock', 'precio', 'marca'];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        errors[field] = true;
      }
    });

    setValidationErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      showNotification('Por favor, rellene todos los campos requeridos');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    const nextId = Math.max(...productos.map(p => p.productoId), 0) + 1;

    if (modalMode === 'create') {
      const newProduct = { 
        ...formData, 
        productoId: nextId,
        precio: parseFloat(formData.precio),
        stock: parseInt(formData.stock)
      };
      setProductos([...productos, newProduct]);
      showNotification('Producto creado correctamente', 'success');
    } else if (modalMode === 'edit') {
      setProductos(productos.map((producto) => 
        producto.productoId === selectedProduct.productoId 
          ? { 
              ...producto, 
              ...formData,
              precio: parseFloat(formData.precio),
              stock: parseInt(formData.stock)
            } 
          : producto
      ));
      showNotification('Producto actualizado correctamente', 'success');
    }
    handleClose();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Limpiar error de validación cuando el usuario empieza a escribir
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: false }));
    }
  };

  return (
    <>
      {notification.show && (
        <div 
          className={`fixed top-4 right-4 p-4 rounded shadow-lg z-50 ${
            notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
          } text-white`}
        >
          {notification.message}
        </div>
      )}
      
      <div className="ml-40 mt-6">
        <button 
          className="bg-sky-600 hover:bg-sky-700 text-white font-semibold py-2 px-4 rounded mb-4 transition duration-300" 
          onClick={handleCreate}
        >
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
                <td className="p-4 text-center">${producto.precio.toFixed(2)}</td>
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
            selectedProduct={selectedProduct}
            onClose={handleClose}
            onSubmit={handleSubmit}
            onFormChange={handleFormChange}
            onConfirmDelete={confirmDelete}
            validationErrors={validationErrors}
          />
        )}
      </div>
    </>
  );
}

export default ManageProducts;