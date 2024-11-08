import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './index.css';
import LandingLayout from './layouts/LandingLayout';
import Home from './pages/landing/home/Home';
import Products from './pages/landing/products/Products';
import ManageProducts from './pages/dashboard/ManageProducts/ManageProducts';
import DashboardLayout from './layouts/DashboardLayout';
import GestionarKardex from './pages/warehouse/GestionarKardex';
import DashboardHome from './pages/dashboard/DashboardHome';
import ManageUsers from './pages/dashboard/ManageUsers/ManageUsers';
import ManageCatalog from './pages/dashboard/ManageCatalog/ManageCatalog';
import Cart from './pages/landing/Cart';
import { CartProvider } from './context/CartContext';
import Orders from './pages/landing/Orders';
import Login from './pages/auth/Login';
import AuthLayout from './layouts/AuthLayout';
import Register from './pages/auth/Register';
import ReporteVentas from './pages/warehouse/ManageProducts/ReporteVentas';
import { UserProvider, useUser } from './context/UserContext'; // Import UserContext

function App() {
  return (
    <UserProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<Login />} /> {/* Make Login the default route */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>

            {/* Role-based routes */}
            <Route path="/*" element={<RoleBasedRoutes />} /> {/* This should handle the role-based route rendering */}
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </UserProvider>
  );
}

// This component conditionally renders routes based on user role
function RoleBasedRoutes() {
  const { user, loading } = useUser(); // Call useUser hook inside the provider context.

  if (loading) {
    return <div>Loading...</div>; // You can display a loading state while checking user data
  }

  console.log('User role:', user?.role); // Add this to check the user's role

  // Redirect to login if no user or no role
  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes> {/* Wrap the routes inside Routes */}
      {/* Landing pages for clients */}
      {user?.role === 'client' && (
        <Route path="/landing/*" element={<LandingLayout />}>
          <Route index element={<Home />} />
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="orders" element={<Orders />} />
        </Route>
      )}

      {/* Dashboard pages for employees */}
      {user?.role === 'employee' && (
        <Route path="/dashboard/*" element={<DashboardLayout />}>
          <Route index element={<DashboardHome />} />
          <Route path="products" element={<ManageProducts />} />
          <Route path="catalog" element={<ManageCatalog />} />
          <Route path="users" element={<ManageUsers />} />
          <Route path="kardex" element={<GestionarKardex />} />
          <Route path="reporte-ventas" element={<ReporteVentas />} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
