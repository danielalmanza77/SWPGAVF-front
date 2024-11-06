import React from 'react';

const ManageProductsModal = ({ 
  mode, 
  formData, 
  selectedProduct,
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
    sku = '', 
    nombre = '', 
    descripcion = '', 
    categoria = '', 
    stock = '', 
    precio = '', 
    marca = '' 
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
            ¿Está seguro de eliminar {selectedProduct.productoId} - {selectedProduct.nombre}?
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
          {isCreateMode ? 'Create Product' : isEditMode ? 'Edit Product' : 'Product Details'}
        </h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">SKU:</label>
            <input
              type="text"
              name="sku"
              value={sku}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('sku')}
              placeholder="Ingrese SKU"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={nombre}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('nombre')}
              placeholder="Ingrese nombre del producto"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Descripción:</label>
            <textarea
              name="descripcion"
              value={descripcion}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('descripcion')}
              placeholder="Ingrese descripción del producto"
              rows="3"
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock:</label>
            <input
              type="number"
              name="stock"
              value={stock}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('stock')}
              placeholder="Ingrese cantidad en stock"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio:</label>
            <input
              type="number"
              step="0.01"
              name="precio"
              value={precio}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('precio')}
              placeholder="Ingrese precio"
              min="0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Marca:</label>
            <input
              type="text"
              name="marca"
              value={marca}
              onChange={onFormChange}
              disabled={isViewMode}
              className={getInputClassName('marca')}
              placeholder="Ingrese marca"
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

export default ManageProductsModal;
