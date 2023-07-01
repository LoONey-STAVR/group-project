import styles from './Header.module.css';
import logo from '../../images/logo.png';
import Navigate from '../Navigate/Navigate';
function Header({ onRandom, onTrend, onLink }) {
    return (
        <div className={styles.header}>
            <img
                src={logo}
                alt='Логотип'
                className={styles.logo}
            />
            <Navigate
                onLink={onLink}
                onTrend={onTrend}
                onRandom={onRandom}
            />
        </div>
    );
}
export default Header;
