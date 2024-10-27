import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const BestSellers = () => {
    return (
        <div className='mb-16'>
        <h1 className='mb-8 text-2xl'>Productos mas comprados</h1>
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
    )
}

export default BestSellers;