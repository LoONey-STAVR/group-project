
import styles from "./Random.module.css"
function Random({ card }) {
    return (
        <div className={styles.content}>
            <img src={card.images && card.images.downsized.url} alt="Изображение" className={styles.images} />
            {card.user &&
                <div className={styles.userInfo}>
                    <img src={card.user.avatar_url} alt="Аватар" className={styles.avatar} />
                    <div>
                        <h3 className={styles.username}>{card.username}</h3>
                        {card.user.description && <p className={styles.title}>{card.user.description}</p>}
                    </div>
                </div>
            }
        </div>
    )
}
export default Random   