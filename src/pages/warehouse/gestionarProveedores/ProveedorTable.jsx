import React, { useState } from 'react';
import { FaBook, FaEdit, FaTrash } from 'react-icons/fa';

const ProveedorTable = ({ proveedores, eliminarProveedor, iniciarEdicion, verProveedor, cambiarEstadoProveedor }) => {
  const [proveedorAEliminar, setProveedorAEliminar] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const manejarMostrarModal = (proveedor) => {
    setProveedorAEliminar(proveedor);
    setShowModal(true);
  };

  const manejarCerrarModal = () => {
    setProveedorAEliminar(null);
    setShowModal(false);
  };

  const manejarEliminarProveedor = () => {
    eliminarProveedor(proveedorAEliminar.id);
    manejarCerrarModal();
  };

  return (
    <>
      <table className="min-w-full bg-white border border-gray-200">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-2 px-4 text-center">ID</th>
            <th className="py-2 px-4 text-center">Nombre</th>
            <th className="py-2 px-4 text-center">Contacto</th>
            <th className="py-2 px-4 text-center">Email</th>
            <th className="py-2 px-4 text-center">Teléfono</th>
            <th className="py-2 px-4 text-center">Dirección</th>
            <th className="py-2 px-4 text-center">Activo</th>
            <th className="py-2 px-4 text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.id} className="border-t">
              <td className="py-2 px-4 text-center">{proveedor.id}</td>
              <td className="py-2 px-4 text-center">{proveedor.nombre}</td>
              <td className="py-2 px-4 text-center">{proveedor.contacto}</td>
              <td className="py-2 px-4 text-center">{proveedor.email}</td>
              <td className="py-2 px-4 text-center">{proveedor.telefono}</td>
              <td className="py-2 px-4 text-center">{proveedor.direccion}</td>
              <td className="py-2 px-4 text-center">
                <input
                  type="checkbox"
                  className="form-checkbox h-5 w-5 text-blue-600"
                  checked={proveedor.activo}
                  onChange={() => cambiarEstadoProveedor(proveedor.id)}
                />
              </td>
              <td className="py-2 px-4 text-center flex justify-center space-x-2">
                <button className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600" onClick={() => verProveedor(proveedor)}>
                  <FaBook />
                </button>
                <button className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600" onClick={() => iniciarEdicion(proveedor)}>
                  <FaEdit />
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" onClick={() => manejarMostrarModal(proveedor)}>
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de confirmación de eliminación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg overflow-hidden shadow-lg">
            <div className="p-4">
              <h2 className="text-xl font-semibold">Confirmar eliminación</h2>
              <p>
                ¿Estás seguro de eliminar el proveedor <strong>{proveedorAEliminar?.id} - {proveedorAEliminar?.nombre}</strong>?
              </p>
            </div>
            <div className="flex justify-end p-4 space-x-2">
              <button className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600" onClick={manejarCerrarModal}>
                Cancelar
              </button>
              <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600" onClick={manejarEliminarProveedor}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProveedorTable;
