import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingLayout from './layouts/LandingLayout'
import Products from './pages/landing/products/Products'
import Home from './pages/landing/home/Home'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingLayout />}>
            <Route index element={<Home />} />
            <Route path='products' element={<Products />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App