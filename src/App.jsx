import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingLayout from './layouts/LandingLayout'
import Products from './pages/landing/products/Products'
import Home from './pages/landing/home/Home'
import GestionarKardex from './pages/warehouse/GestionarKardex'
import FormProduct from './components/FormProduct'


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingLayout />}>
          <Route path='/pilin' element={<FormProduct />}></Route>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
          </Route>
          <Route path='/warehouse' element={<GestionarKardex />} />
          
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App