import { useEffect, useState } from 'react';
import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollTop = window.pageYOffset;

      if (currentScrollTop > lastScrollTop) {
        // Scrolling down
        setScrollingUp(false);
      } else {
        // Scrolling up
        setScrollingUp(true);
      }

      setLastScrollTop(currentScrollTop <= 0 ? 0 : currentScrollTop);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className={`bg-gray-800 text-white p-6 transition-transform duration-300 ease-in-out ${scrollingUp ? 'translate-y-0' : 'translate-y-full'}`}>
      <div className="flex justify-between">
        {/* First Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-bold text-lg">Empresa</h2>
          <Link to="/about" className="hover:underline">Sobre Nosotros</Link>
          <Link to="/services" className="hover:underline">Servicios</Link>
          <Link to="/careers" className="hover:underline">Careers</Link>
          <Link to="/contact" className="hover:underline">Contactanos</Link>
        </div>

        {/* Second Section */}
        <div className="flex flex-col space-y-2">
          <h2 className="font-bold text-lg">Más Información</h2>
          <Link to="/faq" className="hover:underline">Preguntas</Link>
          <Link to="/terms" className="hover:underline">Terminos de Servicio</Link>
          <Link to="/privacy" className="hover:underline">Politica de privacidad</Link>
          <Link to="/blog" className="hover:underline">Blog</Link>
        </div>

        {/* Third Section */}
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-lg">Síguenos</h2>
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaFacebook className="text-2xl" />
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaInstagram className="text-2xl" />
          </a>
          <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-400">
            <FaWhatsapp className="text-2xl" />
          </a>
        </div>
      </div>
      <div className="mt-6 text-center">
        <p>© {new Date().getFullYear()} FENIX LAUPA S.A.C. Todos los derechos reservados.</p>
      </div>
    </div>
  );
};

export default Footer;
