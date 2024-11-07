import { Link } from 'react-router-dom';

const Register = () => {
    return (
        <div className="min-h-screen flex bg-gray-100">
            <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                            Crear cuenta
                        </h2>
                    </div>
                    <form className="mt-8 space-y-8">
                        <div className="rounded-md shadow-sm space-y-4">
                            <div>
                                <label htmlFor="name" className="sr-only">Nombre completo</label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    autoComplete="name"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Nombre completo"
                                />
                            </div>
                            <div>
                                <label htmlFor="email-address" className="sr-only">Correo electrónico</label>
                                <input
                                    id="email-address"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Correo electrónico"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Contraseña</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Contraseña"
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password" className="sr-only">Confirmar contraseña</label>
                                <input
                                    id="confirm-password"
                                    name="confirm-password"
                                    type="password"
                                    autoComplete="new-password"
                                    required
                                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                    placeholder="Confirmar contraseña"
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Crear cuenta
                            </button>
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="text-sm">
                                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                                    ¿Ya tienes una cuenta? Inicia sesión
                                </Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="hidden lg:flex flex-1 items-center justify-center bg-gray-100">
                <div className="max-w-lg w-full">
                    <img
                        src="src/uploads/imagen2.gif" // Cambia la URL de la imagen según lo necesites
                        alt="Register Illustration"
                        className="w-full h-auto object-contain shadow-lg hover:shadow-xl transition-shadow duration-300"
                    />
                </div>
            </div>
        </div>
    );
};

export default Register;
