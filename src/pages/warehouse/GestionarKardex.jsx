import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";


const GestionarKardex = () => {
  const [productos, setProductos] = useState([]);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    stock: "",
    precio: "",
  });
  const [indiceEdicion, setIndiceEdicion] = useState(null);

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setNuevoProducto({ ...nuevoProducto, [name]: value });
  };

  const agregarProducto = () => {
    setProductos([...productos, nuevoProducto]);
    setNuevoProducto({ nombre: "", descripcion: "", imagen: "", stock: "", precio: "" });
  };

  const eliminarProducto = (indice) => {
    const productosActualizados = productos.filter((_, i) => i !== indice);
    setProductos(productosActualizados);
  };

  const editarProducto = (indice) => {
    setIndiceEdicion(indice);
    setNuevoProducto(productos[indice]);
  };

  const actualizarProducto = () => {
    const productosActualizados = productos.map((producto, indice) =>
      indice === indiceEdicion ? nuevoProducto : producto
    );
    setProductos(productosActualizados);
    setNuevoProducto({ nombre: "", descripcion: "", imagen: "", stock: "", precio: "" });
    setIndiceEdicion(null);
  };

  const entradaStock = (indice, cantidad) => {
    const productosActualizados = productos.map((producto, i) =>
      i === indice
        ? { ...producto, stock: producto.stock + cantidad }
        : producto
    );
    setProductos(productosActualizados);
  };

  const salidaStock = (indice, cantidad) => {
    const productosActualizados = productos.map((producto, i) =>
      i === indice
        ? { ...producto, stock: Math.max(producto.stock - cantidad, 0) }
        : producto
    );
    setProductos(productosActualizados);
  };

  return (
    <div className=" ">
      <>
        <div className='mb-5'>  
          <Navbar />
        </div>
      </>

      <div className="mx-4 sm:mx-6 md:mx-12 lg:mx-20 xl:mx-80 mb-6 bg-white p-4 rounded-lg shadow-md flex-grow">
        <h2 className="text-xl font-semibold mb-4">
          {indiceEdicion !== null ? "Editar Nuevo Kardex" : "Nuevo Kardex"}
        </h2>
        <div className="space-y-4"> 
          <input
            type="text"
            name="nombre"
            value={nuevoProducto.nombre}
            onChange={manejarCambio}
            placeholder="Id Del Producto"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="descripcion"
            value={nuevoProducto.descripcion}
            onChange={manejarCambio}
            placeholder="Entrada/Salida"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="text"
            name="imagen"
            value={nuevoProducto.imagen}
            onChange={manejarCambio}
            placeholder="Venta/Compra/Devolución"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            name="stock"
            value={nuevoProducto.stock}
            onChange={manejarCambio}
            placeholder="Cantidad"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
          <input
            type="string"
            name="precio"
            value={nuevoProducto.precio}
            onChange={manejarCambio}
            placeholder="Fecha"
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mt-4">
          {indiceEdicion !== null ? (
            <button
              onClick={actualizarProducto}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Actualizar Producto
            </button>
          ) : (
            <button
              onClick={agregarProducto}
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Agregar Producto
            </button>
          )}
        </div>
      </div>

      <div className="ml-6 mr-6 space-y-4">
        {productos.map((producto, indice) => (
          <div
            key={indice}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow-md"
          >
            <div className="flex items-center space-x-4">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-20 h-20 object-cover rounded-md"
              />
              <div>
                <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                <p>{producto.descripcion}</p>
                <p>Stock: {producto.stock}</p>
                <p>Precio: ${producto.precio}</p>
              </div>
            </div>
            <div className="space-x-2">
              <button
                onClick={() => entradaStock(indice, 1)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Entrada Stock (+1)
              </button>
              <button
                onClick={() => salidaStock(indice, 1)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Salida Stock (-1)
              </button>
              <button
                onClick={() => editarProducto(indice)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Editar
              </button>
              <button
                onClick={() => eliminarProducto(indice)}
                className="bg-gray-500 text-white px-4 py-2 rounded-md"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      <>
        <div className='mt-48'>  
          <Footer />
        </div>
      </>
    </div>
  );
};

export default GestionarKardex;
