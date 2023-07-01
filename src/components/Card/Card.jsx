import styles from './Card.module.css';
import { useState } from 'react';

//
function Card({ card }) {
    const [isActive, setIsActive] = useState(false);

    return (
        <div
            onClick={() => setIsActive((prev) => !prev)}
            className={isActive ? styles.cardActive : styles.card}
        >
            <img
                loading='lazy'
                src={card.images.downsized.url}
                alt=''
                className={styles.images}
            />
            <div className={styles.titleZone}>
                <h2 className={styles.title}>{card.title ? card.title : 'GIF'}</h2>
            </div>
        </div>
    );
}
export default Card;
