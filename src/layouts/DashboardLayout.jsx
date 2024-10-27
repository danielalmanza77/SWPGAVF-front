import React from 'react'
import { Outlet } from 'react-router-dom'
import NavbarDashboard from '../components/dashboard/NavbarDashboard'
import OptionsSideBar from '../components/dashboard/OptionsSidebar'
import Footer from '../components/Footer'

const DashboardLayout = () => {
    return (
        <div className='w-full flex h-screen'>
            <OptionsSideBar />
            <div className='w-[80%]'>
                <NavbarDashboard />
                <div className='p-6 overflow-auto'>
                    <Outlet />
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default DashboardLayout