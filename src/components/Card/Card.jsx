import styles from './Card.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import shareIcon from '../../images/share.svg';
//
function Card({ onShare, card, onCard = null }) {
    function handleClickCard() {
        onCard(card);
    }
    return (
        <Link
            to={`/${card.id}`}
            onClick={onCard && handleClickCard}
            className={styles.card}
            style={{ backgroundImage: `url(${card.images.downsized.url})` }}
        >
            <div
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    onShare(card);
                }}
                style={{
                    backgroundImage: `url(${shareIcon})`,
                }}
                className={styles.share}
            ></div>
            <div className={styles.titleZone}>
                <h2 className={styles.title}>{card.title ? card.title : 'GIF'}</h2>
            </div>
        </Link>
    );
}
export default Card;
