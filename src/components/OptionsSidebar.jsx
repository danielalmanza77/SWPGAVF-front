import React from 'react'
import { Link } from 'react-router-dom'

const OptionsSidebar = () => {
    return (
        <>
            <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Admin Panel</h2>
                <ul className="space-y-2">
                    <li>
                        <Link
                            to="/agregar-producto"
                            className="block text-gray-700 hover:text-gray-900"
                        >
                            Operacion 1 de Usuario
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/gestionar-producto"
                            className="block text-gray-700 hover:text-gray-900"
                        >
                            Operacion 2 de Usuario
                        </Link>
                    </li>
                </ul>
            </div>
        </>

    )
}

export default OptionsSidebar
