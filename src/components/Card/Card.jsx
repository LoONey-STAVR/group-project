import styles from './Card.module.css';
//
function Card({ card }) {
    return (
        <main className={styles.card}>
            <img
                src={card.images.downsized.url}
                alt=''
                className={styles.images}
            />
            <div className={styles.titleZone}>
                <h2 className={styles.title}>{card.title}</h2>
            </div>
        </main>
    );
}
export default Card;
