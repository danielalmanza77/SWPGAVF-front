import React from 'react'
import { Link } from 'react-router-dom';

const DashboardHome = () => {
    return (
        <div className="flex flex-col p-4">
            <h1 className="text-2xl font-bold mb-4">Fenix Laupa SAC Dashboard</h1>

            {/* Resumen de Inventario */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Resumen de Stock</h2>
                <div className="flex justify-between">
                    <div className="text-center">
                        <p className="text-lg">Luminarias Disponibles</p>
                        <p className="text-2xl font-bold">150</p>
                    </div>
                    <div className="text-center">
                        <p className="text-lg">Ventas Este Mes</p>
                        <p className="text-2xl font-bold">75</p>
                    </div>
                </div>
            </div>

            {/* Gráficos de Ventas */}
            <div className="bg-white rounded-lg shadow-md p-4 mb-4">
                <h2 className="text-xl font-semibold mb-2">Gráficos de Ventas</h2>
                {/* Aquí puedes incluir un gráfico, por ejemplo, usando Chart.js o Recharts */}
                <div className="h-48 bg-gray-200 rounded-lg">[Gráfico de Ventas]</div>
            </div>

            {/* Acceso Rápido */}
            <div className="bg-white rounded-lg shadow-md p-4">
                <h2 className="text-xl font-semibold mb-2">Acceso Rápido</h2>
                <div className="grid grid-cols-2 gap-4">
                    <Link to="/inventario" className="bg-blue-500 text-white rounded-lg p-2 text-center">Ver Inventario</Link>
                    <Link to="/ventas" className="bg-blue-500 text-white rounded-lg p-2 text-center">Registrar Ventas</Link>
                    <Link to="/proveedores" className="bg-blue-500 text-white rounded-lg p-2 text-center">Proveedores</Link>
                    <Link to="/reportes" className="bg-purple-500 text-white rounded-lg p-2 text-center">Reportes</Link>
                </div>
            </div>
        </div>
    );
}

export default DashboardHome
