import React from 'react'
import { Link } from 'react-router-dom'

const OptionsSideBar = () => {
    return (
        <div className=" w-[20%] bg-white border border-gray-200 rounded-lg p-4 shadow-md">
            <div className='ps-4'>
              <Link className='focus:outline-none' to="/">
                <h1 className='pl-2 text-2xl font-bold text-white-900 tracking-tight leading-tight'>
                  FENIX LAUPA S.A.C
                </h1>
              </Link>
            </div>
            <ul className="my-8 space-y-6">
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
                <li>
                    <Link
                        to="/gestionar-producto"
                        className="block text-gray-700 hover:text-gray-900"
                    >
                        Operacion 3 de Usuario
                    </Link>
                </li>
            </ul>
        </div>
    )
}

export default OptionsSideBar
