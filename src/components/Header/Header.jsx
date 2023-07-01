import styles from "./Header.module.css"
import logo from "../../images/logo.png"
import Navigate from "../Navigate/Navigate"
function Header() {
   return (
      <div className={styles.header}>
         <img src={logo} alt="Логотип" className={styles.logo} />
         <Navigate />
      </div >
   )
}
export default Header