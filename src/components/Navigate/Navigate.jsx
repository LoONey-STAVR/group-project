import { Link } from 'react-router-dom';
import styles from './Navigate.module.css';
function Navigate({ onRandom, onTrend, onLink }) {
    return (
        <nav className={styles.nav}>
            <Link
                onClick={onLink}
                className={styles.link}
                to='/search'
            >
                Поиск
            </Link>
            <Link
                onClick={onTrend}
                className={styles.link}
                to='/trends'
            >
                Тренды
            </Link>
            <Link
                className={styles.link}
                to='/random'
                onClick={onRandom}
            >
                Случайный гиф
            </Link>
        </nav>
    );
}
export default Navigate;
