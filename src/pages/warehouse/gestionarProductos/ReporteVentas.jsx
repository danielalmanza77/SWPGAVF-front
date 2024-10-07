// import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import ReporteModal from './ReporteModal'; // Asegúrate de que la ruta sea correcta

const ReporteVentas = () => {
    const [fecha, setFecha] = useState(null);
    const [habilitarRango, setHabilitarRango] = useState(false);
    const [fechaInicio, setFechaInicio] = useState(null);
    const [fechaFin, setFechaFin] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formato, setFormato] = useState('');
    const [mensajes, setMensajes] = useState([]);

    useEffect(() => {
        if (mensajes.length > 0) {
            const timers = mensajes.map((mensaje) =>
                setTimeout(() => eliminarMensaje(mensaje.id), 60000)
            );
            return () => timers.forEach((timer) => clearTimeout(timer));
        }
    }, [mensajes]);

    const abrirModal = () => {
        if (!fecha && !habilitarRango) {
            agregarMensaje('error', 'Debe seleccionar una fecha', 'fecha');
            return;
        }

        if (habilitarRango && (!fechaInicio || !fechaFin)) {
            agregarMensaje('error', 'Debe seleccionar ambas fechas', 'rango');
            return;
        }

        setModalIsOpen(true);
    };

    const cerrarModal = () => {
        setModalIsOpen(false);
    };

    const seleccionarFormato = (formatoSeleccionado) => {
        setFormato(formatoSeleccionado);
        cerrarModal();
        generarReporte(formatoSeleccionado);
    };

    const agregarMensaje = (tipo, contenido, campo) => {
        setMensajes([...mensajes, { id: Date.now(), tipo, contenido, campo }]);
    };

    const eliminarMensaje = (id) => {
        setMensajes(mensajes.filter((mensaje) => mensaje.id !== id));
    };

    const generarReporte = async (formato) => {
        try {
            const fechas = habilitarRango
                ? {
                    fechaInicio: fechaInicio ? fechaInicio.toISOString().split('T')[0] : null,
                    fechaFin: fechaFin ? fechaFin.toISOString().split('T')[0] : null,
                }
                : {
                    fecha: fecha ? fecha.toISOString().split('T')[0] : null,
                };

            const contentType =
                formato === 'pdf' ? 'application/pdf' : 'application/vnd.ms-excel';

            const response = await axios.post('/api/reportes/ventas', fechas, {
                headers: {
                    Accept: contentType,
                },
                responseType: 'blob',
            });

            const blob = new Blob([response.data], { type: contentType });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `ReporteVentas_${habilitarRango
                    ? `${fechaInicio?.toLocaleDateString()}_a_${fechaFin?.toLocaleDateString()}`
                    : fecha?.toLocaleDateString()
                }.${formato}`
            );
            document.body.appendChild(link);
            link.click();

            agregarMensaje('exito', 'Descarga exitosa');
        } catch (error) {
            console.error('Error al generar reporte', error);
            agregarMensaje('error', 'Error al generar el reporte');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-5">
            <h1 className="text-3xl text-gray-800 mb-5 text-center">Generar Reporte de Ventas</h1>
            <div className="flex flex-col items-center bg-white p-5 rounded-lg shadow-lg">
                <label className="text-xl text-gray-600 mb-2">Selecciona la fecha:</label>

                {!habilitarRango && (
                    <DatePicker
                        selected={fecha}
                        onChange={(date) => setFecha(date)}
                        dateFormat="dd/MM/yyyy"
                        className={`p-2 text-base border rounded-md mb-5 ${!fecha && mensajes.some((m) => m.campo === 'fecha') ? 'border-red-500' : 'border-gray-300'}`}
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        placeholderText="Fecha"
                    />
                )}

                {habilitarRango && (
                    <>
                        <div className="mb-5">
                            <DatePicker
                                selected={fechaInicio}
                                onChange={(date) => setFechaInicio(date)}
                                dateFormat="dd/MM/yyyy"
                                className={`p-2 text-base border rounded-md ${!fechaInicio && mensajes.some((m) => m.campo === 'rango') ? 'border-red-500' : 'border-gray-300'}`}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="Fecha inicio"
                            />
                        </div>
                        <div className="mb-5">
                            <DatePicker
                                selected={fechaFin}
                                onChange={(date) => setFechaFin(date)}
                                selectsEnd
                                startDate={fechaInicio}
                                endDate={fechaFin}
                                dateFormat="dd/MM/yyyy"
                                className={`p-2 text-base border rounded-md ${!fechaFin && mensajes.some((m) => m.campo === 'rango') ? 'border-red-500' : 'border-gray-300'}`}
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="Fecha fin"
                                minDate={fechaInicio}
                            />
                        </div>
                    </>
                )}

                <div className="flex items-center mb-5">
                    <label className="text-gray-600 cursor-pointer">
                        <input
                            type="checkbox"
                            id="toggle-rango"
                            checked={habilitarRango}
                            onChange={() => {
                                setHabilitarRango(!habilitarRango);
                                setFecha(null);
                                setFechaInicio(null);
                                setFechaFin(null);
                            }}
                            className="mr-2"
                        />
                        Seleccionar rango de fechas
                    </label>
                </div>

                <button className="p-2 px-4 text-xl text-white bg-blue-600 rounded hover:bg-blue-700 transition duration-300" onClick={abrirModal}>
                    Generar Reporte
                </button>

                <ReporteModal isOpen={modalIsOpen} onRequestClose={cerrarModal} onSelectFormato={seleccionarFormato} />

                <div className="fixed top-20 right-5 z-50">
                    {mensajes.map((mensaje) => (
                        <div
                            key={mensaje.id}
                            className={`bg-gray-100 rounded-md p-2 mb-2 shadow-md flex items-center ${mensaje.tipo === 'exito' ? 'border-l-4 border-green-500' : 'border-l-4 border-red-500'}`}
                        >
                            {mensaje.contenido}
                            <button
                                className="ml-2 text-gray-500 hover:text-gray-800"
                                onClick={() => eliminarMensaje(mensaje.id)}
                            >
                                &times;
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ReporteVentas;
