import React from 'react';

const ProductView = ({ producto }) => {
  if (!producto) return null;

  const tieneImagen = producto.imagen && producto.imagen !== '';

  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4">
        {/* 
          The following title is correct as it's a heading.
          Using <h2> for the title is appropriate.
        */}
        <h2 className="text-xl font-bold text-center mb-4">{producto.nombre}</h2>

        {/* 
          Displaying product ID directly in a div.
          Using a div is appropriate here, no nesting issues.
        */}
        <div className="font-medium"><strong>ID:</strong> {producto.id}</div>

        {/* 
          This block shows the product description.
          The problem arises here:
          <strong> and <div> are valid, but if the description were to be wrapped in <p> tags,
          it would lead to <div> appearing inside <p>, which is invalid.
        */}
        <div className="font-medium">
          <strong>Descripción:</strong>
          <div
            className="border border-gray-300 rounded-md p-2 mt-2 max-h-40 overflow-y-auto"
          >
            {producto.descripcion}
          </div>
        </div>

        {/* 
          Price display using a div, which is appropriate.
        */}
        <div className="font-medium"><strong>Precio:</strong> S/{producto.precio}</div>

        {/* 
          Category display using a div, which is appropriate.
        */}
        <div className="font-medium"><strong>Categoría:</strong> {producto.categoria}</div>

        {/* 
          Quantity display using a div, which is appropriate.
        */}
        <div className="font-medium"><strong>Cantidad:</strong> {producto.cantidad}</div>

        {/* 
          Availability display using a div, which is appropriate.
        */}
        <div className="font-medium"><strong>Disponibilidad:</strong> {producto.disponible ? 'Disponible' : 'No Disponible'}</div>

        {/* 
          This block shows the product image.
          The <strong> tag is correctly used here. The <div> below is also valid.
        */}
        <div className="font-medium"><strong>Imagen del producto:</strong></div>
        <div className="text-center mt-2">
          {tieneImagen ? (
            <img
              src={producto.imagen instanceof File ? URL.createObjectURL(producto.imagen) : producto.imagen}
              alt={producto.nombre}
              className="max-w-full h-auto mt-2"
            />
          ) : (
            // Using <span> instead of <p> for the message to avoid invalid nesting
            <span className="text-gray-500 mt-2">No se adjuntó imagen del producto.</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductView;
