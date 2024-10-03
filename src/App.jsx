import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './index.css'
import LandingLayout from './layouts/LandingLayout'
import Products from './pages/Products'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingLayout />} >
            <Route index path='products' element={<Products />}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App