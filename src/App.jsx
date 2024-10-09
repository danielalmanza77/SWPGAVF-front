import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import DashboardLayout from './layouts/DashboardLayout'
import LandingLayout from './layouts/LandingLayout'
import Home from './pages/landing/home/Home'
import Products from './pages/landing/products/Products'
import GestionarProductos from './pages/warehouse/gestionarProductos/GestionarProductos'
import ReporteVentas from './pages/warehouse/gestionarProductos/ReporteVentas'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import AuthLayout from './layouts/AuthLayout'
import GestionarProveedores from './pages/warehouse/gestionarProveedores/GestionarProveedores'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route index path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/' element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
          </Route>
          <Route path='/' element={<DashboardLayout />}>
            <Route index path='/product-dashboard' element={<GestionarProductos />} />
            <Route index path='/supplier-dashboard' element={<GestionarProveedores />} />
            {/* <Route path='/kardex' element={<GestionarKardex />} /> */}
            <Route path='/reporte' element={<ReporteVentas />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App