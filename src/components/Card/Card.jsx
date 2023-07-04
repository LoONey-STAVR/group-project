import './Card.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Share from '../Share/Share';
import ToolTip from '../ToolTip/ToolTip';
import '../../css/animation-ascent.css';

function Card({ card, onCard = null }) {
    const [isCopy, setIsCopy] = useState(false);
    function handleShare(e) {
        e.stopPropagation();
        e.preventDefault();
        navigator.clipboard.writeText(card.images.original.url);
        setIsCopy((prev) => !prev);
        setTimeout(() => {
            setIsCopy((prev) => !prev);
        }, 1500);
    }

    function handleCard() {
        onCard(card);
    }

    return (
        <Link
            to={`/${card.id}`}
            onClick={onCard && handleCard}
            className='card card-big animation-ascent'
            style={{ backgroundImage: `url(${card.images.downsized.url})` }}
        >
            <Share
                onShare={handleShare}
                name='card'
                isActive={isCopy}
            />
            <ToolTip
                name='card'
                isActive={isCopy}
            />
            <div className='card__title-zone'>
                <h2 className='card__title'>{card.title}</h2>
            </div>
        </Link>
    );
}
export default Card;
