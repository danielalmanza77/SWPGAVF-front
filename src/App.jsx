import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingLayout from './layouts/LandingLayout'
import Products from './pages/landing/products/Products'
import Home from './pages/landing/home/Home'

import ReporteVentas from './pages/warehouse/gestionarProductos/ReporteVentas'
import GestionarKardex from './pages/warehouse/GestionarKardex'
import GestionarProductos from './pages/warehouse/gestionarProductos/GestionarProductos'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingLayout />}>
          
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
          </Route>
          <Route path='/warehouse' element={<ReporteVentas />} />
          <Route path='/o' element={<GestionarKardex />} />
          <Route path='/a' element={<GestionarProductos />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App