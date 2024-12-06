import React, { useState, useEffect } from 'react';
import axios from 'axios';

const KardexDetails = () => {
  const [kardexData, setKardexData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterMovement, setFilterMovement] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [loading, setLoading] = useState(true);

  // Fetch Kardex data
  useEffect(() => {
    const fetchKardexData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/kardex');
        setKardexData(response.data);
        setFilteredData(response.data);
      } catch (error) {
        console.error('Error fetching Kardex data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchKardexData();
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = kardexData;

    if (filterMovement) {
      filtered = filtered.filter(item => item.typeOfMovement === filterMovement);
    }

    if (startDate && endDate) {
      filtered = filtered.filter(item => {
        const createdAt = item.createdAt ? new Date(item.createdAt) : null;
        return createdAt && createdAt >= new Date(startDate) && createdAt <= new Date(endDate);
      });
    }

    setFilteredData(filtered);
  }, [filterMovement, startDate, endDate, kardexData]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-sixth text-2xl mb-6">Kardex</h2>
      
      {/* Filters */}
      <div className="mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label htmlFor="typeOfMovement" className="block text-sm font-medium text-gray-700">Tipo de Movimiento</label>
            <select
              id="typeOfMovement"
              value={filterMovement}
              onChange={(e) => setFilterMovement(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            >
              <option value="">Todos</option>
              <option value="Entrada">Entrada</option>
              <option value="Salida">Salida</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">Fecha de Inicio</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>

          <div>
            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700">Fecha de Fin</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* Kardex Table */}
      <table className="min-w-full table-auto border-collapse border border-gray-300 shadow-md">
        <thead className="bg-sky-500 text-white">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">ID</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Empleado</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Tipo de Movimiento</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Tipo de Operación</th>
            <th className="border border-gray-300 px-4 py-2 text-left text-sm font-semibold">Fecha</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="bg-white hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item.id}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item.employeeName}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item.quantity}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item.typeOfMovement}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item.typeOfOperation}</td>
              <td className="border border-gray-300 px-4 py-2 text-sm text-gray-600">{item.createdAt ? new Date(item.createdAt).toLocaleString() : 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default KardexDetails;
