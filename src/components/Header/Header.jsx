import styles from './Header.module.css';
import logo from '../../images/logo.png';
import Navigate from '../Navigate/Navigate';
function Header({ onSearch, onTrends, onRandom }) {
    return (
        <div className={styles.header}>
            <img
                src={logo}
                alt='Логотип'
                className={styles.logo}
            />
            <Navigate
                onTrends={onTrends}
                onRandom={onRandom}
                onSearch={onSearch}
            />
        </div>
    );
}
export default Header;
