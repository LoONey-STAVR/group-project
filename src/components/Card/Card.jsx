import './Card.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/share.svg';
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
            <button
                disabled={isCopy}
                onClick={handleShare}
                style={{
                    backgroundImage: `url(${shareIcon})`,
                }}
                className={`card__share ${isCopy && 'card__share_disabled'}`}
            ></button>
            <div className='card__title-zone'>
                <h2 className='card__title'>{card.title ? card.title : 'GIF'}</h2>
            </div>
            {isCopy && <div className='card__tooltip'>Ссылка скопирована</div>}
        </Link>
    );
}
export default Card;
