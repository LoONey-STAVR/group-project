
import styles from "./Random.module.css"
function Random({ card, handleClickBtn }) {
    return (
        <div className={styles.content}>
            <div>
                <div className={styles.slide}>
                    <img src={card.images && card.images.downsized.url} alt="Изображение" className={styles.images} />
                    <button onClick={handleClickBtn} className={styles.btn}></button>
                </div>
                {card.user &&
                    <div className={styles.userInfo}>
                        <img src={card.user.avatar_url} alt="Аватар" className={styles.avatar} />
                        <h3 className={styles.username}>{card.username}</h3>
                    </div>
                }
            </div>
        </div>
    )
}
export default Random   