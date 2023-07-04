import "./Slider.css";
import { Swiper, SwiperSlide } from 'swiper/react';

import { EffectCoverflow, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';


function Slider({ cards }) {
    const settingsSlider = {
        rotate: -10,
        stretch: 10,
        depth: 100,
        modifier: 2.5,

    }
    const breackPoints = {
        320: {
            slidesPerView: 1,
        },
        480: {
            slidesPerView: 2,
        },
        992: {
            slidesPerView: 3
        }
    }
    return (
        <div>
            <Swiper
                effect={'coverflow'}
                grabCursor={true}
                centeredSlides={true}
                loop={true}
                slidesPerView={"auto"}
                breakpoints={breackPoints}
                coverflowEffect={settingsSlider}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                    clickable: true,
                }}
                modules={[EffectCoverflow, Navigation]}
                className="swiper_container">
                {cards.map(card =>
                    <SwiperSlide id="slide" key={card.id}>
                        <img className="swiper__img" src={card.images.downsized.url} alt="Слайд" />
                    </SwiperSlide>
                )}
                <div className="slider-controler">
                    <div className="swiper-button-prev slider-arrow">
                        <ion-icon name="arrow-back-outline"></ion-icon>
                    </div>
                    <div className="swiper-button-next slider-arrow">
                        <ion-icon name="arrow-forward-outline"></ion-icon>
                    </div>
                </div>
            </Swiper>
        </div>
    )
}
export default Slider