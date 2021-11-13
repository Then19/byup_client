import React from 'react';
import "../styles/NavBar.css"

const NavBar = ({page, ...props}) => {
    return (
        <div className="header">
            <div className="header-section">
                <div className="header-item headerButton">
                    <a className="a-nav" href="/">Главная</a>
                </div>
                <div className="header-item headerButton">
                    <a className="a-nav" href="/shop">Магазин</a>
                </div>
                <div className="header-item headerButton">
                    <a className="a-nav" href="/news">Новости</a>
                </div>
                <div className="header-item headerButton">
                    <a className="a-nav" href="/about">О нас</a>
                </div>
            </div>
            <div className="header-section">
                <div className="header-item headerButton">
                    <a className="a-nav" href="/shopcart">Корзина</a>
                </div>
            </div>
        </div>
    );
};

export default NavBar;