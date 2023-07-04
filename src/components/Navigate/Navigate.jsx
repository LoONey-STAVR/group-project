import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './Navigate.css';
function Navigate({ onLink, setMenuActive, addActiveClass }) {
    const location = useLocation();

    function handleLink() {
        window.scrollTo(0, 0);
        setMenuActive(false);
        onLink();
    }

    return (
        <nav className={addActiveClass('nav-menu')}>
            <Link
                onClick={handleLink}
                className={`nav-menu__link ${location.pathname === '/search' && 'nav-menu__link_active'}`}
                to='/search'
            >
                Поиск
            </Link>
            <Link
                onClick={handleLink}
                className={`nav-menu__link ${location.pathname === '/' && 'nav-menu__link_active'}`}
                to='/'
            >
                Тренды
            </Link>
            <Link
                className={`nav-menu__link ${location.pathname === '/random' && 'nav-menu__link_active'}`}
                to='/random'
                onClick={handleLink}
            >
                Случайный гиф
            </Link>
            <Link
                className={`nav-menu__link ${location.pathname === '/categories' && 'nav-menu__link_active'}`}
                to='/categories'
                onClick={handleLink}
            >
                Категории
            </Link>
        </nav>
    );
}
export default Navigate;
