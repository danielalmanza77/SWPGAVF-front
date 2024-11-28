import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LineChart } from '@mui/x-charts';

const DashboardHome = () => {
    // State to control which chart to display
    const [activeChart, setActiveChart] = useState('sales'); // 'sales' or 'profits'

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

            {/* Gráficos y Accesos Rápidos */}
            <div className="flex gap-4">
                {/* Chart Section */}
                <div className="flex-1 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">
                        {activeChart === 'sales' ? 'Gráficos Pedidos Diarios' : 'Gráficos Ganancias Diarias'}
                    </h2>
                    <div style={{ height: '300px' }}>
                        <LineChart
                            className="w-full"
                            series={
                                activeChart === 'sales'
                                    ? [
                                        { curve: 'linear', data: [0, 5, 2, 6, 3, 9] },
                                    ]
                                    : [
                                        { curve: 'linear', data: [100, 400, 350, 570, 600, 800] },
                                    ]
                            }
                        />
                    </div>
                </div>

                {/* Acceso Rápido */}
                <div className="w-1/3 bg-white rounded-lg shadow-md p-4">
                    <h2 className="text-xl font-semibold mb-2">Acceso Rápido</h2>
                    <div className="grid gap-4">
                        <button
                            className={`bg-blue-500 text-white rounded-lg p-2 text-center ${activeChart === 'sales' ? 'bg-blue-700' : ''
                                }`}
                            onClick={() => setActiveChart('sales')}
                        >
                            Ver Gráfico de Pedidos
                        </button>
                        <button
                            className={`bg-blue-500 text-white rounded-lg p-2 text-center ${activeChart === 'profits' ? 'bg-blue-700' : ''
                                }`}
                            onClick={() => setActiveChart('profits')}
                        >
                            Ver Gráfico de Ganancias
                        </button>
                        <Link to="/inventario" className="bg-blue-500 text-white rounded-lg p-2 text-center">
                            Ver Inventario
                        </Link>
                        <Link to="/ventas" className="bg-blue-500 text-white rounded-lg p-2 text-center">
                            Registrar Ventas
                        </Link>
                        <Link to="/proveedores" className="bg-blue-500 text-white rounded-lg p-2 text-center">
                            Proveedores
                        </Link>
                        <Link to="/reportes" className="bg-purple-500 text-white rounded-lg p-2 text-center">
                            Reportes
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardHome;
