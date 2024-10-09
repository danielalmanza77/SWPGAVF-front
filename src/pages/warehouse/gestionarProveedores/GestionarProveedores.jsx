import React, { useState } from 'react';
import ProveedorTable from './ProveedorTable';
import ProveedorForm from './ProveedorForm';
import ProveedorView from './ProveedorView';
import GestionarProveedorModal from './GestionarProveedorModal';

const GestionarProveedores = () => {
  const [proveedores, setProveedores] = useState([]);
  const [proveedorEditado, setProveedorEditado] = useState(null);
  const [proveedorVisto, setProveedorVisto] = useState(null);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostrarModalVer, setMostrarModalVer] = useState(false);
  const [tipoModal, setTipoModal] = useState(''); // 'agregar' o 'editar'

  // Función para agregar un nuevo proveedor
  const agregarProveedor = (formData) => {
    const nuevoId = proveedores.length + 1;
    const nuevoProveedor = {
      id: nuevoId,
      nombre: formData.get('nombre'),
      contacto: formData.get('contacto'),
      email: formData.get('email'),
      telefono: formData.get('telefono'),
      direccion: formData.get('direccion'),
      activo: true,
    };
    setProveedores([...proveedores, nuevoProveedor]);
    manejarCerrar();
  };

  // Función para actualizar un proveedor
  const actualizarProveedor = (id, formData) => {
    setProveedores(
      proveedores.map((proveedor) =>
        proveedor.id === id
          ? {
              ...proveedor,
              nombre: formData.get('nombre'),
              contacto: formData.get('contacto'),
              email: formData.get('email'),
              telefono: formData.get('telefono'),
              direccion: formData.get('direccion'),
            }
          : proveedor
      )
    );
    manejarCerrar();
  };

  // Función para eliminar un proveedor
  const eliminarProveedor = (id) => {
    setProveedores(proveedores.filter((proveedor) => proveedor.id !== id));
  };

  // Función para abrir el modal de agregar proveedor
  const manejarMostrarAgregar = () => {
    setTipoModal('agregar');
    setProveedorEditado(null);
    setMostrarModal(true);
  };

  // Función para abrir el modal de editar proveedor
  const manejarMostrarEditar = (proveedor) => {
    setTipoModal('editar');
    setProveedorEditado(proveedor);
    setMostrarModal(true);
  };

  // Función para ver un proveedor
  const manejarMostrarVer = (proveedor) => {
    setProveedorVisto(proveedor);
    setMostrarModalVer(true);
  };

  // Función para cerrar los modales
  const manejarCerrar = () => {
    setMostrarModal(false);
    setMostrarModalVer(false);
    setProveedorVisto(null);
  };

  const cambiarEstadoProveedor = (id) => {
    setProveedores(
      proveedores.map((proveedor) =>
        proveedor.id === id ? { ...proveedor, activo: !proveedor.activo } : proveedor
      )
    );
  };

  return (
    <>
      <div className="container">
        <h1 className="my-4">Gestionar Proveedores - Fenix Laupa S.A.C.</h1>

        {/* Botón para agregar proveedor */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 mb-3"
          onClick={manejarMostrarAgregar}
        >
          Agregar Proveedor
        </button>

        {/* Tabla de proveedores */}
        <ProveedorTable
          proveedores={proveedores}
          eliminarProveedor={eliminarProveedor}
          iniciarEdicion={manejarMostrarEditar}
          verProveedor={manejarMostrarVer}
          cambiarEstadoProveedor={cambiarEstadoProveedor}
        />

        {/* Modal para agregar/editar proveedor */}
        <GestionarProveedorModal
          show={mostrarModal}
          onHide={manejarCerrar}
          title={tipoModal === 'agregar' ? 'Agregar Proveedor' : 'Actualizar Proveedor'}
        >
          <ProveedorForm
            agregarProveedor={agregarProveedor}
            proveedorEditado={proveedorEditado}
            actualizarProveedor={actualizarProveedor}
          />
        </GestionarProveedorModal>

        {/* Modal para ver proveedor */}
        <GestionarProveedorModal
          show={mostrarModalVer}
          onHide={manejarCerrar}
          title="Detalles del Proveedor"
        >
          {proveedorVisto && <ProveedorView proveedor={proveedorVisto} />}
        </GestionarProveedorModal>
      </div>
    </>
  );
};

export default GestionarProveedores;
