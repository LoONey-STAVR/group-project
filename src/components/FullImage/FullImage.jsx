import React from 'react';
import './FullImage.css';
import Share from '../Share/Share';
import Back from '../Back/Back';

function FullImage({ card }) {

    function handleBack() {
        window.history.go(-1);
    }
    function handleShare() {
        navigator.clipboard.writeText(card.images.original.url);
    }

    return (
        <section className='full-image'>
            <h2 className='full-image__user'>{card.username}</h2>
            <div className='full-image__panel'>
                <Back
                    onBack={handleBack}
                    name='full-image'
                />
                <div
                    style={{
                        backgroundImage: `url(${card.user.avatar_url})`,
                    }}
                    className='full-image__avatar'
                ></div>
                <Share
                    onShare={handleShare}
                    name='full-image'
                />
            </div>

            <div
                
                style={{
                    backgroundImage: `url(${card.images.original.webp})`,
                    width: `${card.images.original.width}px`,
                    height: `${card.images.original.height}px`,
                }}
                className='full-image__image'
            ></div>
            <h2 className='full-image__title'>{card.title}</h2>
        </section>
    );
}
export default FullImage;
