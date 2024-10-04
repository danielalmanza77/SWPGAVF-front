
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar'
import Footer from '../components/Footer'

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  )
}

export default LandingLayout