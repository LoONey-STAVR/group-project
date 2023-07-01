import { Link } from 'react-router-dom';
import styles from './Navigate.module.css';
function Navigate({ onSearch, onTrends, onRandom }) {
    return (
        <nav className={styles.nav}>
            <Link
                className={styles.link}
                to='/search'
                onClick={onSearch}
            >
                Поиск
            </Link>
            <Link
                className={styles.link}
                to='/trends'
                onClick={onTrends}
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
