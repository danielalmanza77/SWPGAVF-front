import React from 'react';
// import Swiper core and required modules
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';

// // Import Swiper styles
// import 'swiper/css';
// import 'swiper/css/pagination';
// import './styles.css';



const Home = () => {
    const images = [
        'https://via.placeholder.com/600x300?text=Image+1',
        'https://via.placeholder.com/600x300?text=Image+2',
        'https://via.placeholder.com/600x300?text=Image+3',
    ];

    return (
        <div style={{ padding: '30px 0' }}>
            <Swiper
                modules={[Pagination]} // Enable pagination module
                spaceBetween={30} // Space between slides
                slidesPerView={1} // Show one slide at a time
                pagination={{ clickable: true }} // Make pagination dots clickable
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <img src={image} alt={`Slide ${index + 1}`} className="w-full h-auto rounded" />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default Home