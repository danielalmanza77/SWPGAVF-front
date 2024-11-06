import { useState } from "react";
import ManageSuppliersModal from "./ManageSuppliersModal";

function ManageSuppliers() {
  const [proveedores, setProveedores] = useState([
    {
      proveedorId: 1,
      nombre: "Proveedor A",
      contacto: "contactoA@example.com",
      direccion: "Av. Ejemplo 123",
      telefono: "123456789",
      categoria: "Electrónica"
    },
    {
      proveedorId: 2,
      nombre: "Proveedor B",
      contacto: "contactoB@example.com",
      direccion: "Calle h 456",
      telefono: "987654321",
      categoria: "Iluminación"
    }
  ]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    direccion: '',
    telefono: '',
    categoria: ''
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
      nombre: '',
      contacto: '',
      direccion: '',
      telefono: '',
      categoria: ''
    });
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleView = (id) => {
    const supplier = proveedores.find(sup => sup.proveedorId === id);
    setSelectedSupplier(supplier);
    setFormData(supplier);
    setModalMode('view');
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const supplier = proveedores.find(sup => sup.proveedorId === id);
    setSelectedSupplier(supplier);
    setFormData(supplier);
    setModalMode('edit');
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const supplier = proveedores.find(sup => sup.proveedorId === id);
    setSelectedSupplier(supplier);
    setModalMode('delete');
    setModalOpen(true);
  };

  const confirmDelete = () => {
    setProveedores(proveedores.filter((proveedor) => proveedor.proveedorId !== selectedSupplier.proveedorId));
    showNotification('Proveedor eliminado correctamente', 'success');
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['nombre', 'contacto', 'direccion', 'telefono', 'categoria'];

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

    const nextId = Math.max(...proveedores.map(s => s.proveedorId), 0) + 1;

    if (modalMode === 'create') {
      const newSupplier = {
        ...formData,
        proveedorId: nextId
      };
      setProveedores([...proveedores, newSupplier]);
      showNotification('Proveedor creado correctamente', 'success');
    } else if (modalMode === 'edit') {
      setProveedores(proveedores.map((proveedor) =>
        proveedor.proveedorId === selectedSupplier.proveedorId
          ? { ...proveedor, ...formData }
          : proveedor
      ));
      showNotification('Proveedor actualizado correctamente', 'success');
    }
    handleClose();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

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
          Add Supplier
        </button>
        <table className="table-fixed border border-gray-300 shadow-lg rounded-lg w-[80%] bg-white">
          <thead className="bg-sky-500 text-white">
            <tr className="border-b border-sky-600">
              <th className="p-4">Proveedor ID</th>
              <th className="p-4">Nombre</th>
              <th className="p-4">Contacto</th>
              <th className="p-4">Dirección</th>
              <th className="p-4">Teléfono</th>
              <th className="p-4">Categoría</th>
              <th className="p-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {proveedores.map((proveedor) => (
              <tr key={proveedor.proveedorId} className="border-b border-gray-200 hover:bg-sky-50 transition duration-200">
                <td className="p-4 text-center">{proveedor.proveedorId}</td>
                <td className="p-4 text-center">{proveedor.nombre}</td>
                <td className="p-4 text-center">{proveedor.contacto}</td>
                <td className="p-4 text-center">{proveedor.direccion}</td>
                <td className="p-4 text-center">{proveedor.telefono}</td>
                <td className="p-4 text-center">{proveedor.categoria}</td>
                <td className="p-4 flex justify-around">
                  <button className="p-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded transition duration-300" onClick={() => handleView(proveedor.proveedorId)}>
                    View
                  </button>
                  <button className="p-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded transition duration-300" onClick={() => handleEdit(proveedor.proveedorId)}>
                    Edit
                  </button>
                  <button className="p-2 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded transition duration-300" onClick={() => handleDelete(proveedor.proveedorId)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isModalOpen && (
          <ManageSuppliersModal
            mode={modalMode}
            formData={formData}
            selectedSupplier={selectedSupplier}
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

export default ManageSuppliers;
