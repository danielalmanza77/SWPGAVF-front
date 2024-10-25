import React from 'react';

const ReporteModal = ({ isOpen, onRequestClose, onSelectFormato }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-5 rounded-lg shadow-lg w-1/3">
                <h2 className="text-xl mb-4">Selecciona el formato de descarga</h2>
                <div className="flex justify-around">
                    <button onClick={() => onSelectFormato('pdf')}>
                        <img src="/images/excel-icon.png" alt="PDF" className="w-15 h-15" />
                    </button>
                    <button onClick={() => onSelectFormato('excel')}>
                        <img src="/images/pdf-icon.png" alt="Excel" className="w-15 h-15" />
                    </button>
                </div>
                <button className="mt-4 text-gray-600" onClick={onRequestClose}>
                    Cerrar
                </button>
            </div>
        </div>
    );
};

export default ReporteModal;
