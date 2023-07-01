import styles from "./Card.module.css"
//
function Card({ card }) {

   return (
      <div className={styles.card}>
         <img src={card.images.downsized.url} alt="" className={styles.images} />
         <h2 className={styles.title}>{card.user.description}</h2>
      </div>
   )
}
export default Card