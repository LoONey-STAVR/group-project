import styles from './Card.module.css';
//
function Card({ card }) {
    console.log(card);
    return (
        <div className={styles.card}>
            <img
                src={card.images.downsized.url}
                alt=''
                className={styles.images}
            />
            <div className={styles.titleZone}>
                <h2 className={styles.title}>{card.title}</h2>
            </div>
        </div>
    );
}
export default Card;
