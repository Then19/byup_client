import React from 'react';
import Carousel from 'react-elastic-carousel';
import items from "../components/configs/carusel.json"
import '../styles/MainPage.css'

const Main = () => {
    let state = items
    return (
        <div>
            <div>
                <Carousel enableAutoPlay autoPlaySpeed={6000}>
                    {state.items.map(item => <div className="main-carusel-box" key={item.id}>
                        <div className="main-img-box">
                            <a href={item.href}>
                                <img className="main-carusel-img" src={"http://localhost:5000/get_img/" + item.title} alt=""/>
                            </a>
                        </div>
                    </div>)}
                </Carousel>
            </div>
            <div className="main-text-block">
                <h1 className="main-text-title">BYUP - магазин наклеек</h1>
                <p className="main-text-span">Магазин в котором ты сможешь найти наклейки на любой вкус. Ознакомся со всем товарам и
                тебе точно что то понравится. Мы работаем только на территории Тюмени и доставляем товар сами.
                Перейдите в <a className="main-about-a" href="/shop">магазин</a>, выберите товар и оформляйте заказ.</p>
            </div>
            <div className="main-must-items-box">
                <h2>Популярный товар</h2>
            </div>
            <div className="main-must-items-box">
                <div className="main-must-items">
                    {state.mustItems.map(item => <div className="main-must-item" key={item.id}>
                        <a href={item.href}><img className="main-must-item-img" src={"http://localhost:5000/get_img/" + item.img_name} alt=""/></a>
                    </div>)}
                </div>
            </div>
        </div>
    );
};

export default Main;