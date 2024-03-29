import React from 'react';
import './FullImage.css';
import Share from '../Share/Share';
import Back from '../Back/Back';
import ToolTip from '../ToolTip/ToolTip';
function FullImage({ card }) {
    const [isCopy, setIsCopy] = React.useState(false);
    const [image] = React.useState({
        url: card.images.original.url,
        width: card.images.original.width,
        height: card.images.original.height,
    });

    function handleBack() {
        window.history.go(-1);
    }
    function handleShare() {
        setIsCopy(true);
        setTimeout(() => {
            setIsCopy((prev) => !prev);
        }, 1000);
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
                    isActive={isCopy}
                />
                <ToolTip
                    isActive={isCopy}
                    name={'full-image'}
                />
            </div>

            <div
                style={{
                    backgroundImage: `url(${image.url})`,
                    width: `${image.width}px`,
                    height: `${image.height}px`,
                }}
                className='full-image__image animation-fade'
            ></div>
            <h2 className='full-image__title'>{card.title}</h2>
        </section>
    );
}
export default FullImage;
