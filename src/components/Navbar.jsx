import { useEffect, useState } from 'react'; // Combine imports
import { FaBars, FaShoppingCart, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';

const Navbar = () => {
  const [scrollingUp, setScrollingUp] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);
  const { user, logout } = useUser(); // Get user data and logout function
  const [tooltipVisible, setTooltipVisible] = useState(false); // For controlling tooltip visibility

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
              <Link className='focus:outline-none' to="/landing">
                <h1 className='pl-2 text-2xl font-bold text-white-900 tracking-tight leading-tight'>
                  FENIX LAUPA S.A.C
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
            {/* Welcome message after FaBars */}
            {user && (
              <p className="text-white ml-4">Bienvenido, {user.name} {user.lastname}</p>
            )}
          </div>

          <div className="flex items-center space-x-8 pr-4">
            <Link to="/landing/products" className="focus:outline-none">
              Productos
            </Link>
            <Link to="/landing/orders" className="focus:outline-none">
              Pedidos
            </Link>
            <Link to="/landing/cart" className="focus:outline-none">
              <FaShoppingCart className="text-white text-2xl" />
            </Link>

            {/* User Profile and Tooltip */}
            {user && (
              <div
                className="relative"
                onMouseEnter={() => setTooltipVisible(true)} // Show tooltip on hover
                onMouseLeave={() => setTooltipVisible(false)} // Hide tooltip when mouse leaves
              >
                <button className="focus:outline-none">
                  <FaUser className="text-white text-2xl" />
                </button>
                {/* Tooltip - shown only when hovering over FaUser */}
                {tooltipVisible && (
                  <div className="absolute right-0 bg-white text-black text-sm p-3 rounded shadow-lg mt-2 w-48">
                    <p className="font-semibold">{user.username}</p>
                    <p>{user.email}</p>
                    <button 
                      onClick={logout}
                      className="mt-2 text-red-500 hover:text-red-700 text-sm"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
