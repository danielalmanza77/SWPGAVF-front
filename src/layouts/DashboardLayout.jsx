import React from 'react'
import { Outlet } from 'react-router-dom'
import SidebarDashboard from '../components/dashboard/SIdebarDashboard'

const DashboardLayout = () => {

    return (
            <div className='flex mb-12'>
                <SidebarDashboard />
                <div className='w-[90%] bg-slate-100 px-4 py-6'>
                    <Outlet />
                </div>
            </div>
    )
}

export default DashboardLayout
