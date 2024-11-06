
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const LandingLayout = () => {
  return (
    <>
      <Navbar />
      <div className='w-[90%] m-auto py-10'>
        <Outlet />
      </div>
      <Footer />
    </>
  )
}

export default LandingLayout