import React from 'react';

const ManageCatalogModal = ({ mode, formData, onClose, onSubmit, onFormChange, images, onImageChange }) => {
  const isViewMode = mode === 'view';
  const isEditMode = mode === 'edit';
  const isCreateMode = mode === 'create';

  // Destructure formData with default values to avoid undefined
  const { 
    sku = '', 
    name = '', 
    description = '', 
    category = '', 
    stock = 0, 
    price = 0, 
    brand = '' 
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

          <label className="block mt-2">Name:</label>
          <input
            type="text"
            name="name"
            value={name}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Description:</label>
          <textarea
            name="description"
            value={description}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Category:</label>
          <input
            type="text"
            name="category"
            value={category}
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

          <label className="block mt-2">Price:</label>
          <input
            type="number"
            step="0.01"
            name="price"
            value={price || ''} // Ensure price is an empty string if undefined
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          <label className="block mt-2">Brand:</label>
          <input
            type="text"
            name="brand"
            value={brand}
            onChange={onFormChange}
            disabled={isViewMode}
            className="border border-gray-300 p-2 rounded w-full"
          />

          {/* Image Selection */}
          {isCreateMode && (
            <>
              <label className="block mt-2">Upload Images (2):</label>
              <input 
                type="file" 
                multiple 
                accept="image/*"
                onChange={onImageChange} 
                className="border border-gray-300 p-2 rounded w-full"
              />
              {images.length > 0 && (
                <div className="mt-2">
                  {images.map((image, idx) => (
                    <p key={idx}>{image.name}</p>
                  ))}
                </div>
              )}
            </>
          )}

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

export default ManageCatalogModal;
