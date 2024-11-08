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
                {/* Slide 1 */}
                <SwiperSlide className='relative'>
                    <img src='/images/b1.jpg' alt='Banner 1' className="w-full h-full object-cover rounded-lg" />
                </SwiperSlide>

                {/* Slide 2 */}
                <SwiperSlide className='relative'>
                    <img src='/images/b2.jpg' alt='Banner 2' className="w-full h-full object-cover rounded-lg" />
                </SwiperSlide>

                {/* Slide 3 */}
                <SwiperSlide className='relative'>
                    <img src='/images/b1.jpg' alt='Banner 3' className="w-full h-full object-cover rounded-lg" />
                </SwiperSlide>
            </Swiper>
        </section>
    );
};

export default Banner;
