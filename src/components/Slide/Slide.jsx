import React from 'react';
import './Slide.css';

function Slide({ card }) {
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
                    src={card.images.original ? card.images.original.url : card.images.downsized.url}
                    alt='Изображение'
                    className='slide__image'
                />
            </div>
        </div>
    );
}
export default Slide;
