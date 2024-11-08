import { FreeMode } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import './styles.css';

const BestSellers = () => {
    return (
        <div className='mb-16'>
            <h1 className='mb-8 text-2xl'>Productos más comprados</h1>
            <Swiper
                slidesPerView={3}
                spaceBetween={30}
                freeMode={true}
                modules={[FreeMode]}
                className="mySwiper"
            >
                <SwiperSlide className='relative'>
                    <img src='/images/p42.jpg' alt='Producto 1' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p22.jpg' alt='Producto 2' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p32.jpg' alt='Producto 3' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p82.jpg' alt='Producto 4' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p72.jpg' alt='Producto 5' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p52.jpg' alt='Producto 6' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p32.jpg' alt='Producto 7' className="slide-image" />
                </SwiperSlide>
                <SwiperSlide className='relative'>
                    <img src='/images/p12.jpg' alt='Producto 8' className="slide-image" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default BestSellers;
