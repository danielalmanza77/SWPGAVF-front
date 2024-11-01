import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingLayout from './layouts/LandingLayout'
import Home from './pages/landing/home/Home'
import Products from './pages/landing/products/Products'
import ManageProducts from './pages/warehouse/ManageProducts/ManageProducts'
import DashboardLayout from './layouts/DashboardLayout'
import GestionarKardex from './pages/warehouse/GestionarKardex'
import Login from './pages/auth/Login'
import AuthLayout from './layouts/AuthLayout'
import Register from './pages/auth/Register'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<AuthLayout />}>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
          </Route>
          <Route path='/' element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
            
          </Route>
          <Route path='/' element={<DashboardLayout />}>
            <Route path='manage' element={<ManageProducts />} />
            <Route path='kardex' element={<GestionarKardex />} />
          </Route>
          {/* <Route path='/warehouse' element={<GestionarKardex />} /> */}
          {/* <Route path='/warehouse' element={<ManageProducts />} /> */}
          {/* <Route path='/warehouse' element={<ReporteVentas />} />  */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App