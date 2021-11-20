import React from 'react';
import "../styles/NavBar.css"

const NavBar = ({page, ...props}) => {
    return (
        <div className="header">
            <ul className="header-section">
                <a className="a-nav" href="/"><li className="header-item headerButton">Главная</li></a>
                <a className="a-nav" href="/shop"><li className="header-item headerButton">Магазин</li></a>
                <a className="a-nav" href="/about"><li className="header-item headerButton">О нас</li></a>
            </ul>
            <ul className="header-section">
                <a className="a-nav" href="/shopcart"><li className="header-item headerButton">Корзина</li></a>
            </ul>
        </div>
    );
};

export default NavBar;