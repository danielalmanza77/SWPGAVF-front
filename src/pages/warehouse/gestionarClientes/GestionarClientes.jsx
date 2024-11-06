
import { useState } from "react";
import React from 'react';
function ManageClients() {
  const [clientes, setClientes] = useState([
    {
      clienteId: 1,
      nombre: "Carlos",
      apellidoPaterno: "Ramírez",
      apellidoMaterno: "Quispe",
      fechaDeNac: "1992-03-21",
      correo: "carlos.ramirez@example.com",
      telefono: "951753258",
      direccion: "Av. Arequipa 1000, Miraflores"
    },
    {
      clienteId: 2,
      nombre: "María",
      apellidoPaterno: "Guzmán",
      apellidoMaterno: "Fernández",
      fechaDeNac: "1988-07-11",
      correo: "maria.guzman@example.com",
      telefono: "948632145",
      direccion: "Jr. Ayacucho 567, San Juan de Lurigancho"
    },
    {
      clienteId: 3,
      nombre: "Luis",
      apellidoPaterno: "Vega",
      apellidoMaterno: "Rojas",
      fechaDeNac: "1995-10-30",
      correo: "luis.vega@example.com",
      telefono: "986521473",
      direccion: "Calle Los Pinos 34, Surco"
    },
    {
      clienteId: 4,
      nombre: "Carmen",
      apellidoPaterno: "Huamán",
      apellidoMaterno: "Sánchez",
      fechaDeNac: "1977-02-05",
      correo: "carmen.huaman@example.com",
      telefono: "963852147",
      direccion: "Av. Javier Prado Este 450, La Molina"
    },
    {
      clienteId: 5,
      nombre: "Jorge",
      apellidoPaterno: "Paredes",
      apellidoMaterno: "Mendoza",
      fechaDeNac: "1983-11-19",
      correo: "jorge.paredes@example.com",
      telefono: "921753468",
      direccion: "Av. La Marina 3421, San Miguel"
    },
    {
      clienteId: 6,
      nombre: "Sofía",
      apellidoPaterno: "Castillo",
      apellidoMaterno: "Torres",
      fechaDeNac: "1990-08-29",
      correo: "sofia.castillo@example.com",
      telefono: "987456321",
      direccion: "Jr. Cusco 75, Pueblo Libre"
    },
    {
      clienteId: 7,
      nombre: "Fernando",
      apellidoPaterno: "Flores",
      apellidoMaterno: "Cárdenas",
      fechaDeNac: "1972-09-17",
      correo: "fernando.flores@example.com",
      telefono: "945621387",
      direccion: "Jr. Puno 1250, Cercado de Lima"
    },
    {
      clienteId: 8,
      nombre: "Ricardo",
      apellidoPaterno: "Cruz",
      apellidoMaterno: "Acuña",
      fechaDeNac: "1981-04-03",
      correo: "ricardo.cruz@example.com",
      telefono: "941526378",
      direccion: "Av. Primavera 345, Surquillo"
    }
  
]);

  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedClient, setSelectedClient] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidoPaterno: '',
    apellidoMaterno: '',
    fechaDeNac: '',
    correo: '',
    telefono: '',
    direccion: ''
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
      apellidoPaterno: '',
      apellidoMaterno: '',
      fechaDeNac: '',
      correo: '',
      telefono: '',
      direccion: ''
    });
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleView = (id) => {
    const client = clientes.find(cli => cli.clienteId === id);
    setSelectedClient(client);
    setFormData(client);
    setModalMode('view');
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const client = clientes.find(cli => cli.clienteId === id);
    setSelectedClient(client);
    setFormData(client);
    setModalMode('edit');
    setValidationErrors({});
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    const client = clientes.find(cli => cli.clienteId === id);
    setSelectedClient(client);
    setModalMode('delete');
    setModalOpen(true);
  };

  const confirmDelete = () => {
    setClientes(clientes.filter((cliente) => cliente.clienteId !== selectedClient.clienteId));
    showNotification('Cliente eliminado correctamente', 'success');
    handleClose();
  };

  const handleClose = () => {
    setModalOpen(false);
    setValidationErrors({});
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = ['nombre', 'apellidoPaterno', 'apellidoMaterno', 'fechaDeNac', 'correo', 'telefono', 'direccion'];

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

    const nextId = Math.max(...clientes.map(cli => cli.clienteId), 0) + 1;

    if (modalMode === 'create') {
      const newClient = {
        ...formData,
        clienteId: nextId
      };
      setClientes([...clientes, newClient]);
      showNotification('Cliente creado correctamente', 'success');
    } else if (modalMode === 'edit') {
      setClientes(clientes.map((cliente) =>
        cliente.clienteId === selectedClient.clienteId
          ? { ...cliente, ...formData }
          : cliente
      ));
      showNotification('Cliente actualizado correctamente', 'success');
    }
    handleClose();
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    if (['nombre', 'apellidoPaterno', 'apellidoMaterno'].includes(name)) {
      if (!/^[a-zA-Z\s]*$/.test(value)) {
        return; 
      }
    }
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
          
          <h1 className="text-gray-500 font-semibold text-4xl py-4 px-6 rounded-lg text-center">
  Gestionar Clientes
</h1>
      
<div className="w-full overflow-x-auto rounded-lg">
  <table className="table-fixed border border-gray-300 shadow-lg rounded-lg mb-10 w-full bg-white mt-7">
    <thead className="bg-sky-800 text-white rounded-t-lg shadow-lg">
      <tr className="border-b border-sky-600 rounded-t-lg ">
        <th className="p-3 rounded-tl-lg">Cliente ID</th>
        <th className="p-3">Nombre</th>
        <th className="p-3">Apellido Paterno</th>
        <th className="p-3">Apellido Materno</th>
        <th className="p-3">Fecha de Nac.</th>
        <th className="p-3">Correo</th>
        <th className="p-3">Teléfono</th>
        <th className="p-3">Dirección</th>
        <th className="p-3 rounded-tr-lg">Acciones</th>
      </tr>
    </thead>
    <tbody>
      {clientes.map((cliente) => (
        <tr key={cliente.clienteId} className="border-b border-gray-200 hover:bg-sky-50 transition duration-200 rounded-lg">
          <td className="p-3 text-center rounded-lg">{cliente.clienteId}</td>
          <td className="p-3 text-center rounded-lg">{cliente.nombre}</td>
          <td className="p-3 text-center rounded-lg">{cliente.apellidoPaterno}</td>
          <td className="p-3 text-center rounded-lg">{cliente.apellidoMaterno}</td>
          <td className="p-3 text-center rounded-lg">{cliente.fechaDeNac}</td>
          <td className="p-3 text-center rounded-lg">{cliente.correo}</td>
          <td className="p-3 text-center rounded-lg">{cliente.telefono}</td>
          <td className="p-3 text-center rounded-lg">{cliente.direccion}</td>
          <td className="p-3 flex justify-around rounded-lg">
            <button className="p-1 bg-blue-900 hover:bg-blue-900 text-white font-semibold rounded-lg transition duration-300" onClick={() => handleView(cliente.clienteId)}>
              Ver
            </button>
            <button className="p-1 bg-blue-800 hover:bg-blue-900 text-white font-semibold rounded-lg transition duration-300" onClick={() => handleEdit(cliente.clienteId)}>
              Editar
            </button>
            <button className="p-1 bg-blue-700 hover:bg-blue-900 text-white font-semibold rounded-lg transition duration-300" onClick={() => handleDelete(cliente.clienteId)}>
              Eliminar
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  <button
  className="bg-sky-700 hover:bg-sky-700 text-white font-semibold py-2 px-3 rounded mb-2 transition duration-300 mt-2"
  onClick={handleCreate}
  >
  Añadir Cliente
</button>
</div>

        {isModalOpen && (
          <ManageClientsModal
            mode={modalMode}
            formData={formData}
            selectedClient={selectedClient}
            onClose={handleClose}
            onSubmit={handleSubmit}
            onFormChange={handleFormChange}
            onConfirmDelete={confirmDelete}
            validationErrors={validationErrors}
          />
        )}
      
    </>
  );
}

const ManageClientsModal = ({ 
  mode, 
  formData, 
  selectedClient,
  onClose, 
  onSubmit, 
  onFormChange,
  onConfirmDelete,
  validationErrors 
}) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';
  const isDeleteMode = mode === 'delete';

  const { 
    nombre = '', 
    apellidoPaterno = '', 
    apellidoMaterno = '', 
    fechaDeNac = '', 
    correo = '', 
    telefono = '', 
    direccion = '' 
  } = formData;


  const getInputClassName = (fieldName) => {
    const baseClasses = "border p-2 rounded w-full transition-colors duration-200";
    if (isViewMode) return `${baseClasses} bg-gray-100`;
    return validationErrors[fieldName] 
      ? `${baseClasses} border-red-500 focus:border-red-500` 
      : baseClasses;
  };

  if (isDeleteMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
          <p className="mb-4">
            ¿Está seguro de eliminar {selectedClient.clienteId} - {selectedClient.nombre}?
          </p>
          <div className="flex justify-end gap-2">
            <button
              onClick={onConfirmDelete}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition duration-300"
            >
              Eliminar
            </button>
            <button
              onClick={onClose}
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition duration-300"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[50%] max-h-[80vh] bg-white p-6 rounded-lg shadow-xl overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {isCreateMode ? 'Crear Cliente' : isEditMode ? 'Editar Cliente' : 'Detalles del Cliente'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('nombre')}
              placeholder="Ingrese nombre del cliente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Paterno:</label>
            <input
              type="text"
              name="apellidoPaterno"
              value={apellidoPaterno}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('apellidoPaterno')}
              placeholder="Ingrese apellido paterno"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Apellido Materno:</label>
            <input
              type="text"
              name="apellidoMaterno"
              value={apellidoMaterno}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('apellidoMaterno')}
              placeholder="Ingrese apellido materno"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaDeNac"
              value={fechaDeNac}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('fechaDeNac')}
              max="2007-12-31"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo:</label>
            <input
              type="email"
              name="correo"
              value={correo}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('correo')}
              placeholder="Ingrese correo electrónico"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono:</label>
            <input
                  type="text"
                  name="telefono"
                  value={telefono}
                  maxLength={11} 
                  onChange={(e) => {
                    const { name, value } = e.target;
                    if (/^\d+$/.test(value)) {
                      onFormChange({ target: { name, value: value.slice(0, 11) } }); 
                    }
                  }}

              
              disabled={isViewMode}
              className={getInputClassName('telefono')}
              placeholder="Ingrese teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección:</label>
            <input
              type="text"
              name="direccion"
              value={direccion}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('direccion')}
              placeholder="Ingrese dirección"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            {!isViewMode && (
              <button 
                type="submit" 
                className="bg-sky-900 hover:bg-sky-600 text-white px-4 py-2 rounded transition duration-300"
              >
                {isCreateMode ? 'Crear' : 'Actualizar'}
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-200 hover:bg-gray-400 text-black-300 px-4 py-2 rounded transition duration-300"
            >
              {isViewMode ? 'Cerrar' : 'Cancelar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageClients;