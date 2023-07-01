import { Link } from "react-router-dom"
import styles from "./Navigate.module.css";
function Navigate() {
   return (
      <nav className={styles.nav}>
         <Link className={styles.link} to="#">Поиск</Link>
         <Link className={styles.link} to="#">Тренды</Link>
         <Link className={styles.link} to="#">Случайный гиф</Link>
      </nav >
   )
}
export default Navigate