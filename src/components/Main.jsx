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
            <div className="main-must-items-box">
                <h2>Популярный товар</h2>
            </div>
        </div>
    );
};

export default Main;