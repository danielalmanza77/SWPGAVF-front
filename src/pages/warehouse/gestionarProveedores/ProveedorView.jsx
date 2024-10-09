import React from 'react';

const ProveedorView = ({ proveedor }) => {
  if (!proveedor) return null;

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        <h2 className="text-xl font-bold text-center mb-4">{proveedor.nombre}</h2>

        <div className="font-medium"><strong>ID:</strong> {proveedor.id}</div>
        <div className="font-medium"><strong>Contacto:</strong> {proveedor.contacto}</div>
        <div className="font-medium"><strong>Email:</strong> {proveedor.email}</div>
        <div className="font-medium"><strong>Teléfono:</strong> {proveedor.telefono}</div>
        <div className="font-medium"><strong>Dirección:</strong></div>
        <div
          className="border border-gray-300 rounded-md p-2 mt-2 max-h-40 overflow-y-auto"
        >
          {proveedor.direccion}
        </div>
        <div className="font-medium"><strong>Estado:</strong> {proveedor.activo ? 'Activo' : 'Inactivo'}</div>
      </div>
    </div>
  );
};

export default ProveedorView;
