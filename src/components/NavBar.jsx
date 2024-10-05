import { useEffect, useState } from 'react'; // Combine imports
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Navbar = () => {
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
    <>
      <div className={`relative bg-blue-800 text-white z-40 transition-transform duration-300 ease-in-out ${scrollingUp ? 'translate-y-0' : '-translate-y-full'}`}>
        <nav className='p-4 flex items-center justify-between'>
          <div className='flex items-center space-x-4'>
            <div className='ps-4'>
              <Link className='focus:outline-none' to="/">
                <h1 className='pl-2 text-2xl font-bold text-white-900 tracking-tight leading-tight'>
                  S.A.C
                </h1>
              </Link>
            </div>
            <div>
              <button
                className="focus:outline-none ml-8 p-2 rounded hover:bg-blue-700"
              >
                <FaBars className="text-white text-2xl" />
              </button>
            </div>
          </div>
          {/* <div className="w-full flex justify-center relative">
            <input
              type="text"
              placeholder="Buscar..."
              className="w-1/2 p-2 pl-12 rounded-md focus:outline-none"
            />
            <div className="absolute left-1/4 transform -translate-x-1/6 h-full flex items-center pl-4 pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
          </div> */}
          <div>
            <Link to={"/products"} className='me-6'>
              Productos
            </Link>
          </div>
          <div className="flex items-center space-x-8 pr-4">
            <button className="focus:outline-none">
              <FaShoppingCart className="text-white text-2xl" />
            </button>
            <Link to="/login" className="focus:outline-none">
              <FaUser className="text-white text-2xl" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
