import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y, Autoplay, FreeMode } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
import './styles.css';



const Home = () => {
    const images = [
        'https://via.placeholder.com/600x300?text=Image+1',
        'https://via.placeholder.com/600x300?text=Image+2',
        'https://via.placeholder.com/600x300?text=Image+3',
    ];

    return (
        <>
        {/* banner */}
        <section className='mb-16'>
                <Swiper
                    autoplay={{
                        delay: 5500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        dynamicBullets: true,
                    }}
                    modules={[Autoplay, Pagination]}
                    className="mySwiper"
                >
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 1</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 2</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 3</SwiperSlide>
                </Swiper>
            </section>
            
            {/* carousel */}
            <div className='mb-16'> {/* Add a margin bottom here */}
                <h1 className='mb-8 text-2xl text-center'> PRODUCTOS DESTACADOS DEL MES </h1>
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    freeMode={true}
                    modules={[FreeMode]}
                    className="mySwiper"
                >
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 1</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 2</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 3</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 4</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 1</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 2</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 3</SwiperSlide>
                    <SwiperSlide className='bg-indigo-500 p-24'>Slide 4</SwiperSlide>
                </Swiper>
            </div>
        
        </>
        
            
    );
}

export default Home