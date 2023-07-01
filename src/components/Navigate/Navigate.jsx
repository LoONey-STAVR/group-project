import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './Navigate.module.css';
function Navigate({ onRandom, onTrend, onLink }) {
    const location = useLocation();
    return (
        <nav className={styles.nav}>
            <Link
                onClick={location.pathname !== '/search' && onLink}
                className={styles.link}
                to='/search'
            >
                Поиск
            </Link>
            <Link
                onClick={location.pathname !== '/trends' && onTrend}
                className={styles.link}
                to='/trends'
            >
                Тренды
            </Link>
            <Link
                className={styles.link}
                to='/random'
                onClick={location.pathname !== '/random' && onRandom}
            >
                Случайный гиф
            </Link>
        </nav>
    );
}
export default Navigate;
