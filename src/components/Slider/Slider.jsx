import './Slider.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useRef, useEffect, useState } from 'react';

import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
function Slider({ cards }) {
    const refSlider = useRef();

    const settingsSlider = {
        rotate: -10,
        stretch: 15,
        depth: 100,
        modifier: 2.5,
    };
    const breackPoints = {
        320: {
            slidesPerView: 2,
        },
        480: {
            slidesPerView: 3,
        },
        992: {
            slidesPerView: 3,
        },
    };
    return (
        <div ref={refSlider}>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={'auto'}
                breakpoints={breackPoints}
                coverflowEffect={settingsSlider}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Navigation]}
                className='swiper_container'
            >
                {cards.map((card, index) => (
                    <SwiperSlide
                        id='slide'
                        key={index}
                    >
                        <img
                            className='swiper__img'
                            src={card.images.downsized.url}
                            alt='Слайд'
                        />
                    </SwiperSlide>
                ))}
                <div className='slider-controler'>
                    <div className='swiper-button-prev slider-arrow'>
                        <ion-icon name='arrow-back-outline'></ion-icon>
                    </div>
                    <div className='swiper-button-next slider-arrow'>
                        <ion-icon name='arrow-forward-outline'></ion-icon>
                    </div>
                </div>
            </Swiper>
        </div>
    );
}
export default Slider;
