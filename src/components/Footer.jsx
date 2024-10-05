import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                    <div>
                        <h4 className="font-bold mb-4">Atención al cliente</h4>
                        <ul>
                            <li className="mb-2"><Link to="/help-center" className="text-gray-400 hover:text-white">Centro de ayuda</Link></li>
                            <li className="mb-2"><Link to="/contact" className="text-gray-400 hover:text-white">Contáctanos</Link></li>
                            <li className="mb-2"><Link to="/pqr" className="text-gray-400 hover:text-white">PQR</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Sobre nosotros</h4>
                        <ul>
                            <li className="mb-2"><Link to="/about" className="text-gray-400 hover:text-white">Quiénes somos</Link></li>
                            <li className="mb-2"><Link to="/careers" className="text-gray-400 hover:text-white">Trabaja con nosotros</Link></li>
                            <li className="mb-2"><Link to="/press" className="text-gray-400 hover:text-white">Prensa</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Políticas</h4>
                        <ul>
                            <li className="mb-2"><Link to="/terms" className="text-gray-400 hover:text-white">Términos y condiciones</Link></li>
                            <li className="mb-2"><Link to="/privacy" className="text-gray-400 hover:text-white">Política de privacidad</Link></li>
                            <li className="mb-2"><Link to="/cookies" className="text-gray-400 hover:text-white">Cookies</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-bold mb-4">Síguenos</h4>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-white"><FaFacebookF /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaTwitter /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaInstagram /></a>
                            <a href="#" className="text-gray-400 hover:text-white"><FaYoutube /></a>
                        </div>
                    </div>
                </div>
                <div className="mt-10 text-center text-gray-400">
                    <p>&copy; 2024 FenixLaupa S.A.C. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
