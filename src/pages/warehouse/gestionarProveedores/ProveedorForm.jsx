import React, { useEffect, useState } from 'react';

const ProveedorForm = ({ agregarProveedor, proveedorEditado, actualizarProveedor }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    contacto: '',
    email: '',
    telefono: '',
    direccion: '',
  });

  useEffect(() => {
    if (proveedorEditado) {
      setFormData({
        nombre: proveedorEditado.nombre,
        contacto: proveedorEditado.contacto,
        email: proveedorEditado.email,
        telefono: proveedorEditado.telefono,
        direccion: proveedorEditado.direccion,
      });
    }
  }, [proveedorEditado]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      dataToSubmit.append(key, formData[key]);
    });

    if (proveedorEditado) {
      actualizarProveedor(proveedorEditado.id, dataToSubmit);
    } else {
      agregarProveedor(dataToSubmit);
    }

    // Reset the form
    setFormData({
      nombre: '',
      contacto: '',
      email: '',
      telefono: '',
      direccion: '',
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Proveedor</label>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Contacto</label>
        <input
          type="text"
          name="contacto"
          value={formData.contacto}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Teléfono</label>
        <input
          type="tel"
          name="telefono"
          value={formData.telefono}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Dirección</label>
        <textarea
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          rows="3"
          style={{ resize: 'vertical', minHeight: '100px' }}
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {proveedorEditado ? 'Actualizar Proveedor' : 'Agregar Proveedor'}
      </button>
    </form>
  );
};

export default ProveedorForm;
