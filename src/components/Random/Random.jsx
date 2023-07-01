import styles from "./Random.module.css"
function Random({ card }) {
    return (
        <div className={styles.content}>
            <img src={card.images.downsized.url} alt="Изображение" className={styles.images} />
        </div>
    )
}
export default Random   