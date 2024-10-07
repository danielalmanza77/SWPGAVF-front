import React, { useState } from 'react';
import ProductTable from './ProductTable';
import ProductModalTwo from './ProductModalTwo';
import ProductForm from './ProductForm';
import ProductView from './ProductView';



const GestionarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [productoEditado, setProductoEditado] = useState(null);
  const [productoVisto, setProductoVisto] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [tipoModal, setTipoModal] = useState(''); // 'agregar' o 'editar'

  // Función para agregar un nuevo producto
  const agregarProducto = (formData) => {
    const nuevoId = productos.length + 1;
    const nuevoProducto = {
      id: nuevoId,
      nombre: formData.get('nombre'),
      descripcion: formData.get('descripcion'),
      precio: formData.get('precio'),
      categoria: formData.get('categoria'),
      cantidad: formData.get('cantidad'),
      disponible: true,
      imagen: formData.get('imagen')
    };
    setProductos([...productos, nuevoProducto]);
    manejarCerrar();
  };

  // Función para actualizar un producto
  const actualizarProducto = (id, formData) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id
          ? {
              ...producto,
              nombre: formData.get('nombre'),
              descripcion: formData.get('descripcion'),
              precio: formData.get('precio'),
              categoria: formData.get('categoria'),
              cantidad: formData.get('cantidad'),
              imagen: formData.get('imagen') || producto.imagen
            }
          : producto
      )
    );
    manejarCerrar();
  };

  // Función para eliminar un producto
  const eliminarProducto = (id) => {
    setProductos(productos.filter((producto) => producto.id !== id));
  };

  // Función para abrir el modal de agregar producto
  const manejarMostrarAgregar = () => {
    setTipoModal('agregar');
    setProductoEditado(null);
    setMostrarModal(true);
  };

  // Función para abrir el modal de editar producto
  const manejarMostrarEditar = (producto) => {
    setTipoModal('editar');
    setProductoEditado(producto);
    setMostrarModal(true);
  };

  // Función para ver un producto
  const manejarMostrarVer = (producto) => {
    setProductoVisto(producto);
    setMostrarModalVer(true);
  };

  // Función para cerrar los modales
  const manejarCerrar = () => {
    setMostrarModal(false);
    setMostrarModalVer(false);
    setProductoVisto(null);
  };

  const cambiarDisponibilidad = (id) => {
    setProductos(
      productos.map((producto) =>
        producto.id === id ? { ...producto, disponible: !producto.disponible } : producto
      )
    );
  };

  return (
    <>
      <div className="container">
        <h1 className="my-4">Gestionar Catálogo - Fenix Laupa S.A.C.</h1>

        {/* Botón para agregar producto */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-3"
          onClick={manejarMostrarAgregar}
        >
          Agregar Producto
        </button>

        {/* Tabla de productos */}
        <ProductTable
          productos={productos}
          eliminarProducto={eliminarProducto}
          iniciarEdicion={manejarMostrarEditar}
          verProducto={manejarMostrarVer}
          cambiarDisponibilidad={cambiarDisponibilidad}
        />

        {/* Modal para agregar/editar producto */}
        <ProductModalTwo
          show={mostrarModal}
          onHide={manejarCerrar}
          title={tipoModal === 'agregar' ? 'Agregar Producto' : 'Actualizar Producto'}
        >
          <ProductForm
            agregarProducto={agregarProducto}
            productoEditado={productoEditado}
            actualizarProducto={actualizarProducto}
          />
        </ProductModalTwo>

        {/* Modal para ver producto */}
        <ProductModalTwo
          show={mostrarModalVer}
          onHide={manejarCerrar}
          title="Detalles del Producto"
        >
          {productoVisto && <ProductView producto={productoVisto} />}
        </ProductModalTwo>
      </div>
    </>
  );
};

export default GestionarProductos;
