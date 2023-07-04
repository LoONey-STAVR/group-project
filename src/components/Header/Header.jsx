import './Header.css';
import Navigate from '../Navigate/Navigate';
import { useState } from 'react';
function Header({ onLink }) {
    const [menuActive, setMenuActive] = useState(false);
    function addActiveClass(className) {
        return menuActive ? `${className} active` : className;
    }
    return (
        <div className={addActiveClass("header")}>
            <div className='glitch'></div>
            <Navigate
                onLink={onLink}
                setMenuActive={setMenuActive}
                addActiveClass={addActiveClass}
            />
            <div onClick={() => setMenuActive(prev => !prev)} className={addActiveClass("header__menu")}>
                <span className={addActiveClass("header__burger")}></span>
            </div>
        </div>
    );
}
export default Header;
