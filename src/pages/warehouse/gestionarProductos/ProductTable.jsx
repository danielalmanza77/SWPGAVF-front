import React, { useState } from 'react';
import { FaBook, FaEdit, FaTrash } from 'react-icons/fa';

const ProductTable = ({ productos, eliminarProducto, iniciarEdicion, verProducto, cambiarDisponibilidad }) => {
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const manejarMostrarModal = (producto) => {
    setProductoAEliminar(producto);
    setShowModal(true);
  };

  const manejarCerrarModal = () => {
    setProductoAEliminar(null);
    setShowModal(false);
  };

  const manejarEliminarProducto = () => {
    eliminarProducto(productoAEliminar.id);
    manejarCerrarModal();
  };

  return (
    <>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-center">ID</th>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Precio</th>
            <th className="py-2 px-4 text-center">Categoría</th>
            <th className="py-2 px-4 text-center">Cantidad</th>
            <th className="py-2 px-4 text-center">Disponibilidad</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto) => (
            <tr key={producto.id} className="border-t">
              <td className="py-2 px-4 text-center">{producto.id}</td>
              <td className="py-2 px-4 text-center">{producto.nombre}</td>
              <td className="py-2 px-4 text-center">{producto.precio}</td>
              <td className="py-2 px-4 text-center">{producto.categoria}</td>
              <td className="py-2 px-4 text-center">{producto.cantidad}</td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={producto.disponible}
                  onChange={() => cambiarDisponibilidad(producto.id)}
                />
              </td>
              <td className="py-2 px-4 text-center flex justify-center space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => verProducto(producto)}>
                  <FaBook />
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => iniciarEdicion(producto)}>
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => manejarMostrarModal(producto)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Custom Tailwind-based modal replacing React Bootstrap's modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Confirmar eliminación</h2>
              <p>
                ¿Estás seguro de eliminar el producto <strong>{productoAEliminar?.id} - {productoAEliminar?.nombre}</strong>?
              </p>
            </div>
            <div className="flex justify-end p-4 space-x-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={manejarCerrarModal}>
                Cancelar
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={manejarEliminarProducto}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductTable;
