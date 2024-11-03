import React from 'react';

const ManageSuppliersModal = ({ 
  mode, 
  formData, 
  selectedSupplier,
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
    contacto = '', 
    direccion = '', 
    telefono = '', 
    categoria = '' 
  } = formData;

  const getInputClassName = (fieldName) => {
    const baseClasses = "border p-2 rounded w-full transition-colors duration-200";
    if (isViewMode) return `${baseClasses} bg-gray-100`;
    return validationErrors[fieldName] 
      ? `${baseClasses} border-red-500 focus:border-red-500` 
      : baseClasses;
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;

    // Filtrar solo caracteres numéricos
    if (/^\d*$/.test(value)) {
      onFormChange({ target: { name, value } });
    }
  };

  if (isDeleteMode) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
          <h2 className="text-xl font-semibold mb-4">Confirmar Eliminación</h2>
          <p className="mb-4">
            ¿Está seguro de eliminar {selectedSupplier.proveedorId} - {selectedSupplier.nombre}?
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
          {isCreateMode ? 'Crear Proveedor' : isEditMode ? 'Editar Proveedor' : 'Detalles del Proveedor'}
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
              placeholder="Ingrese nombre del proveedor"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contacto:</label>
            <input
              type="email"
              name="contacto"
              value={contacto}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('contacto')}
              placeholder="Ingrese contacto"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={telefono}
              onChange={handlePhoneChange}
              disabled={isViewMode}
              className={getInputClassName('telefono')}
              placeholder="Ingrese teléfono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Categoría:</label>
            <input
              type="text"
              name="categoria"
              value={categoria}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('categoria')}
              placeholder="Ingrese categoría"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            {!isViewMode && (
              <button 
                type="submit" 
                className="bg-sky-500 hover:bg-sky-600 text-white px-4 py-2 rounded transition duration-300"
              >
                {isCreateMode ? 'Crear' : 'Actualizar'}
              </button>
            )}
            <button 
              type="button" 
              onClick={onClose} 
              className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition duration-300"
            >
              {isViewMode ? 'Cerrar' : 'Cancelar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageSuppliersModal;
