import React, { useEffect, useRef } from 'react';
import './Slide.css';

function Slide({ card, onLoad }) {
    const refImg = useRef();
    const [isVision, setIsVision] = React.useState(false);
    useEffect(() => {
        refImg.current.onload = () => setIsVision(true);
        onLoad();
    }, [onLoad]);
    return (
        <div className='slide'>
            <div className='slide__user-info'>
                <img
                    style={{
                        width: card.images.original.width,
                        height: card.images.original.height,
                    }}
                    src={card.user.avatar_url}
                    alt='Аватар'
                    className='slide__avatar'
                />

                <h3 className='slide__username'>{card.username}</h3>
                <img
                    ref={refImg}
                    src={card.images.original ? card.images.original.url : card.images.downsized.url}
                    alt='Изображение'
                    className={`slide__image ${!isVision && 'slide__image_invisible'}`}
                />
            </div>
        </div>
    );
}
export default Slide;
