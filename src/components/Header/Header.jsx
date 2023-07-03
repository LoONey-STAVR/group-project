import './Header.css';
import logo from '../../images/logo.png';
import Navigate from '../Navigate/Navigate';
function Header({ onRandom, onTrend, onLink }) {
    return (
        <div className='header'>
            {/* <img
                src={logo}
                alt='Логотип'
                className='header__logo'
            /> */}
            <Navigate
                onLink={onLink}
                onTrend={onTrend}
                onRandom={onRandom}
            />
        </div>
    );
}
export default Header;
