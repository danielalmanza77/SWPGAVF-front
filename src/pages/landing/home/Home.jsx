import React from 'react';
import Sidebar from "../../../components/home/Sidebar"
import Banner from "../../../components/home/Banner"
import TopSales from "../../../components/home/BestSellers"
import LatestProducts from "../../../components/home/LatestProducts"
import Info from '../../../components/home/Info';
import Promos from '../../../components/home/Promos';

const Home = () => {
    return (
        <>
            <div className='flex gap-x-6 mb-12'>
                <Sidebar />
                <Banner/>
            </div>
            <TopSales/>
            <LatestProducts/>
            <Promos/>
            <Info/>
        </>
    );
}

export default Home