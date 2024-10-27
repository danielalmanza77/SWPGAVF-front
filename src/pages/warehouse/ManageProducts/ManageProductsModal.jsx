import React from 'react';

const ManageProductsModal = ({ mode, formData, onClose, onSubmit, onFormChange }) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  // Destructure formData with default values to avoid undefined
  const { 
    sku = '', 
    nombre = '', 
    descripcion = '', 
    categoria = '', 
    stock = 0, 
    precio = 0, 
    marca = '' 
  } = formData;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="w-[50%] h-[60%] bg-white p-6 rounded shadow-lg overflow-y-auto">
        <h2 className="text-xl font-semibold mb-4">
          {isCreateMode ? 'Create Product' : isEditMode ? 'Edit Product' : 'Product Details'}
        </h2>
        <form onSubmit={onSubmit}>
          <label className="block mt-2">SKU:</label>
          <input
            type="text"
            name="sku"
            value={sku}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={nombre}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Descripcion:</label>
          <textarea
            name="descripcion"
            value={descripcion}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Categoria:</label>
          <input
            type="text"
            name="categoria"
            value={categoria}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Stock:</label>
          <input
            type="number"
            name="stock"
            value={stock || ''} // Ensure stock is an empty string if undefined
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Precio:</label>
          <input
            type="number"
            step="0.01"
            name="precio"
            value={precio || ''} // Ensure precio is an empty string if undefined
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Marca:</label>
          <input
            type="text"
            name="marca"
            value={marca}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <div className="flex justify-end mt-4">
            {!isViewMode && (
              <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                {isCreateMode ? 'Create' : 'Save'}
              </button>
            )}
            <button type="button" onClick={onClose} className="bg-gray-300 text-black px-4 py-2 rounded ml-2">
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ManageProductsModal;
