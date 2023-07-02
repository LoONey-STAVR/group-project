import './Card.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/share.svg';
//
function Card({ onShare, card, onCard = null }) {
    const [isCopy, setIsCopy] = useState(false);
    function handleClickCard() {
        onCard(card);
    }

    function handleClickCopy(e) {
        e.stopPropagation();
        e.preventDefault();
        onShare(card);
        setIsCopy((prev) => !prev);
        setTimeout(() => {
            setIsCopy((prev) => !prev);
        }, 1500);
    }

    return (
        <Link
            to={`/${card.id}`}
            onClick={onCard && handleClickCard}
            className='card'
            style={{ backgroundImage: `url(${card.images.downsized.url})` }}
        >
            <div
                onClick={handleClickCopy}
                style={{
                    backgroundImage: `url(${shareIcon})`,
                }}
                className='card__share'
            ></div>
            <div className='card__title-zone'>
                <h2 className='card__title'>{card.title ? card.title : 'GIF'}</h2>
            </div>
            {isCopy && <div className='card__tooltip'>Ссылка скопирована</div>}
        </Link>
    );
}
export default Card;
