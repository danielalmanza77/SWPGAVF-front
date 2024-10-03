
import { Outlet } from 'react-router-dom'
import Navbar from '../components/NavBar'

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}

export default LandingLayout