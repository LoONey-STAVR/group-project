import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navigate.css';
function Navigate({ onRandom, onTrend, onLink }) {
    const location = useLocation();
    return (
        <nav className='nav-menu'>
            <Link
                onClick={location.pathname !== '/search' && onLink}
                className={`nav-menu__link ${location.pathname === '/search' && 'nav-menu__link_active'}`}
                to='/search'
            >
                Поиск
            </Link>
            <Link
                onClick={location.pathname !== '/trends' && onTrend}
                className={`nav-menu__link ${location.pathname === '/trends' && 'nav-menu__link_active'}`}
                to='/trends'
            >
                Тренды
            </Link>
            <Link
                className={`nav-menu__link ${location.pathname === '/random' && 'nav-menu__link_active'}`}
                to='/random'
                onClick={location.pathname !== '/random' && onRandom}
            >
                Случайный гиф
            </Link>
            <Link
                className={`nav-menu__link ${location.pathname === '/categories' && 'nav-menu__link_active'}`}
                to='/categories'
                onClick={location.pathname !== '/random' && onRandom}
            >
                Категории
            </Link>
        </nav>
    );
}
export default Navigate;
