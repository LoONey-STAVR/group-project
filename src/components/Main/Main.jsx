import styles from "./Main.module.css"
import Card from "../Card/Card"
function Main({ cards }) {
   console.log(cards)
   return (
      <main className={styles.content}>
         {cards.map(card =>
            <Card key={card.id} card={card} />
         )}
      </main>
   )
}
export default Main