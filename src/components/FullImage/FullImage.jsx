import React from 'react';
import './FullImage.css';
import iconBack from '../../images/back.svg';
function FullImage({ onBack, card }) {
    console.log(card);
    return (
        <section className='full-image'>
            <div
                style={{
                    backgroundImage: `url(${card.images.downsized.url})`,
                }}
                className='full-image__image'
            >
                <div
                    onClick={onBack}
                    style={{
                        backgroundImage: `url(${iconBack})`,
                    }}
                    className='full-image__back-btn'
                ></div>
            </div>
            <h2 className='full-image__title'>{card.title}</h2>
        </section>
    );
}
export default FullImage;