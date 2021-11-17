import React from 'react';
import "../styles/NavBar.css"

const NavBar = ({page, ...props}) => {
    return (
        <div className="header">
            <ul className="header-section">
                <li className="header-item headerButton">
                    <a className="a-nav" href="/">Главная</a>
                </li>
                <li className="header-item headerButton">
                    <a className="a-nav" href="/shop">Магазин</a>
                </li>
                <li className="header-item headerButton">
                    <a className="a-nav" href="/about">О нас</a>
                </li>
            </ul>
            <ul className="header-section">
                <li className="header-item headerButton">
                    <a className="a-nav" href="/shopcart">Корзина</a>
                </li>
            </ul>
        </div>
    );
};

export default NavBar;