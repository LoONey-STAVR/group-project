import './Card.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Share from '../Share/Share';
import ToolTip from '../ToolTip/ToolTip';
import '../../css/animation-ascent.css';
import { useRef } from 'react';

function Card({ card, onCard = null }) {
    const [isCopy, setIsCopy] = useState(false);
    const refCard = useRef();
    let position;
    const [isOut, setIsOut] = useState('');
    useEffect(() => {
        function fc() {
            position = refCard.current.getBoundingClientRect();
            if (position.top < 0) {
                setIsOut(true);
            } else {
                setIsOut(false);
            }
            console.log(position);
        }
        window.addEventListener('scroll', fc);

        return () => {
            window.removeEventListener('scroll', fc);
        };
    }, []);

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
            ref={refCard}
            to={`/${card.id}`}
            onClick={onCard && handleCard}
            className={`card card-big ${isOut && 'card_out'} animation-ascent`}
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
