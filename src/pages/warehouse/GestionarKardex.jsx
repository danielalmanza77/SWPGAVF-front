import React from 'react'
import OptionsSidebar from '../../components/OptionsSidebar'

const GestionarKardex = () => {
    return (
        <>
            <div className='w-[90%] mx-auto py-10 flex gap-x-8'>
                <div className='w-[25%]'>
                    <OptionsSidebar />
                </div>
                <div className='w-[75%]'>
                    Dash
                </div>
            </div>
        </>
    )
}

export default GestionarKardex
