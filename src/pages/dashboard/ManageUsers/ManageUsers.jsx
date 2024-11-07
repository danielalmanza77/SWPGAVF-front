import React, { useState } from 'react';

const ManageUsers = () => {
  const [usuarios, setUsuarios] = useState([
    { id: 1, fechaAlta: '2023-01-01', nombre: 'Juan', apellidos: 'Pérez', email: 'juan@gmail.com' },
    { id: 2, fechaAlta: '2023-02-15', nombre: 'Ana', apellidos: 'Gómez', email: 'ana@gmail.com' },
  ]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    fechaAlta: '',
    nombre: '',
    apellidos: '',
    email: '',
  });

  const handleCreate = () => {
    setModalMode('create');
    setFormData({ id: '', fechaAlta: '', nombre: '', apellidos: '', email: '' });
    setModalOpen(true);
  };

  const handleView = (id) => {
    const user = usuarios.find((user) => user.id === id);
    setSelectedUser(user);
    setFormData(user);
    setModalMode('view');
    setModalOpen(true);
  };

  const handleEdit = (id) => {
    const user = usuarios.find((user) => user.id === id);
    setSelectedUser(user);
    setFormData(user);
    setModalMode('edit');
    setModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsuarios(usuarios.filter((user) => user.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modalMode === 'create') {
      const newUser = { ...formData, id: usuarios.length + 1 };
      setUsuarios([...usuarios, newUser]);
      handleClose();
    } else if (modalMode === 'edit') {
      setUsuarios(
        usuarios.map((user) =>
          user.id === selectedUser.id ? { ...user, ...formData } : user
        )
      );
      handleClose();
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <div className="p-6 bg-white rounded-lg">
      <h1 className="text-2xl mb-6 text-sixth">Gestionar Usuarios</h1>

      <button onClick={handleCreate} className="bg-sky-600 text-white py-2 px-4 rounded mb-4">
        Agregar Usuario
      </button>

      <table className="border border-gray-300 shadow-lg rounded-lg w-full bg-white">
        <thead className="bg-sky-500 text-white">
          <tr className="border-b border-sky-600">
            <th className="p-4">ID</th>
            <th className="p-4">Fecha Alta</th>
            <th className="p-4">Nombre</th>
            <th className="p-4">Apellidos</th>
            <th className="p-4">Email</th>
            <th className="p-4">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((user) => (
            <tr key={user.id} className="border-b border-gray-200 hover:bg-sky-50 transition duration-200">
              <td className="p-4 text-center">{user.id}</td>
              <td className="p-4 text-center">{user.fechaAlta}</td>
              <td className="p-4 text-center">{user.nombre}</td>
              <td className="p-4 text-center">{user.apellidos}</td>
              <td className="p-4 text-center">{user.email}</td>
              <td className="p-4 flex justify-around">
                <button className="p-2 bg-sky-400 hover:bg-sky-500 text-white font-semibold rounded transition duration-300" onClick={() => handleView(user.id)}>
                  Ver
                </button>
                <button className="p-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded transition duration-300" onClick={() => handleEdit(user.id)}>
                  Editar
                </button>
                <button className="p-2 bg-sky-800 hover:bg-sky-900 text-white font-semibold rounded transition duration-300" onClick={() => handleDelete(user.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <UserModal
          mode={modalMode}
          formData={formData}
          onClose={handleClose}
          onSubmit={handleSubmit}
          onFormChange={(e) => setFormData({ ...formData, [e.target.name]: e.target.value })}
        />
      )}
    </div>
  );
};

const UserModal = ({ mode, formData, onClose, onSubmit, onFormChange }) => (
  <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
    <div className="bg-white p-6 rounded-lg w-96">
      <h2 className="text-xl mb-4">{mode === 'edit' ? 'Editar Usuario' : 'Agregar Usuario'}</h2>
      <form onSubmit={onSubmit} className="space-y-4">
        <input
          type="text"
          name="nombre"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={onFormChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="text"
          name="apellidos"
          placeholder="Apellidos"
          value={formData.apellidos}
          onChange={onFormChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={onFormChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <input
          type="date"
          name="fechaAlta"
          placeholder="Fecha Alta"
          value={formData.fechaAlta}
          onChange={onFormChange}
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
        />
        <div className="flex justify-end space-x-2">
          <button type="button" onClick={onClose} className="bg-gray-400 text-white px-4 py-2 rounded">
            Cancelar
          </button>
          <button type="submit" className="bg-sky-600 text-white px-4 py-2 rounded">
            {mode === 'edit' ? 'Guardar Cambios' : 'Agregar'}
          </button>
        </div>
      </form>
    </div>
  </div>
);

export default ManageUsers;
