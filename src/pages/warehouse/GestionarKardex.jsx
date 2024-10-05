import React from 'react'
import OptionsSideBar from '../../components/OptionsSideBar'

const GestionarKardex = () => {
    return (
        <>
            <div className='w-[90%] mx-auto py-10 flex gap-x-8'>
                <div className='w-[25%]'>
                    <OptionsSideBar />
                </div>
                <div className='w-[75%]'>
                    Dashboard
                </div>
            </div>
        </>
    )
}

export default GestionarKardex
