import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingLayout from './layouts/LandingLayout'
import Home from './pages/landing/home/Home'
import Products from './pages/landing/products/Products'
import ManageProducts from './pages/dashboard/ManageProducts/ManageProducts'
import DashboardLayout from './layouts/DashboardLayout'
import GestionarKardex from './pages/warehouse/GestionarKardex'
import DashboardHome from './pages/dashboard/DashboardHome'
import ManageUsers from './pages/dashboard/ManageUsers/ManageUsers'
import ManageCatalog from './pages/dashboard/ManageCatalog/ManageCatalog'
import Cart from './pages/landing/Cart'
import { CartProvider } from './context/CartContext'
import Orders from './pages/landing/Orders'

function App() {

  return (
    <>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* <Route path='/' element={<AuthLayout />}>
            <Route index path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route> */}
            <Route path='/' element={<LandingLayout />}>
              <Route index element={<Home />} />
              <Route path='products' element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<Orders />} />
            </Route>
            <Route path='/dashboard' element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path='products' element={<ManageProducts />} />
              <Route path='catalog' element={<ManageCatalog />} />
              <Route path='users' element={<ManageUsers />} />
              <Route path='kardex' element={<GestionarKardex />} />
            </Route>
            {/* <Route path='/warehouse' element={<GestionarKardex />} /> */}
            {/* <Route path='/warehouse' element={<ManageProducts />} /> */}
            {/* <Route path='/warehouse' element={<ReporteVentas />} />  */}
          </Routes>
        </BrowserRouter>
      </CartProvider>

    </>
  )
}

export default App