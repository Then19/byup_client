import React from 'react';
import "../styles/NavBar.css"

const NavBar = ({page, ...props}) => {
    return (
        <div className="header">
            <div className="header-section">
                <div className="header-item headerButton">
                    <a href="/">Главная</a>
                </div>
                <div className="header-item headerButton">
                    <a href="/shop">Магазин</a>
                </div>
                <div className="header-item headerButton">
                    <a href="/about">Новости</a>
                </div>
                <div className="header-item headerButton">
                    <a href="/about">О нас</a>
                </div>
            </div>
            <div className="header-section">
                <div className="header-item headerButton">
                    <a href="/shopcart">Корзина</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;