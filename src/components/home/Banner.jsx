import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import './styles.css';

const Banner = () => {
    return (
        <section className='max-w-[80%] bg-white p-4 rounded-lg'>
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
    )
}

export default Banner;