import React, { useEffect, useState } from 'react';

const ProductForm = ({ agregarProducto, productoEditado, actualizarProducto }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    cantidad: '',
    categoria: '',
    imagen: null,
  });

  useEffect(() => {
    if (productoEditado) {
      setFormData({
        nombre: productoEditado.nombre,
        descripcion: productoEditado.descripcion,
        precio: productoEditado.precio,
        cantidad: productoEditado.cantidad,
        categoria: productoEditado.categoria,
        imagen: null, // Reset the image when editing
      });
    }
  }, [productoEditado]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSubmit = new FormData();
    Object.keys(formData).forEach(key => {
      dataToSubmit.append(key, formData[key]);
    });

    if (productoEditado) {
      actualizarProducto(productoEditado.id, dataToSubmit);
    } else {
      agregarProducto(dataToSubmit);
    }

    // Reset the form
    setFormData({
      nombre: '',
      descripcion: '',
      precio: '',
      cantidad: '',
      categoria: '',
      imagen: null,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nombre del Producto</label>
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
        <label className="block text-sm font-medium text-gray-700">Descripción</label>
        <textarea
          name="descripcion"
          value={formData.descripcion}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          rows="3"
          style={{ resize: 'vertical', minHeight: '100px' }}
          required
        ></textarea>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Precio</label>
        <input
          type="number"
          name="precio"
          step="any"
          value={formData.precio}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Cantidad</label>
        <input
          type="number"
          name="cantidad"
          value={formData.cantidad}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Categoría</label>
        <input
          type="text"
          name="categoria"
          value={formData.categoria}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Imagen del Producto</label>
        <input
          type="file"
          name="imagen"
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        {productoEditado ? 'Actualizar Producto' : 'Agregar Producto'}
      </button>
    </form>
  );
};

export default ProductForm;
