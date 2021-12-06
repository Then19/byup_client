import React, {useEffect, useState} from 'react';
import "../styles/NavBar.css"

const NavBar = ({page, ...props}) => {

    const [show, setShow] = useState("")

    useEffect(() => {
        let lastPosition = window.pageYOffset
        window.onscroll = () => {
            if (window.pageYOffset > lastPosition) {
                setShow("header-hide")
            } else {
                setShow("")
            }
            lastPosition = window.pageYOffset
        }
    }, []);


    return (
        <div className={"header " + show}>
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