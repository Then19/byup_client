import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import "../styles/ShopItem.css"
import {showToast} from "../tools/toast";
import axios from "axios";

const ShopItem = ({page, ...props}) => {
    const params = useParams()

    const [item, setItem] = useState({'id': 0, 'item_name': 'Server', 'item_description': 'Not', 'item_price': 0,
        'img_name': 'test', 'count': 777})

    async function getItemApi() {
        const response = await axios.get("https://api.byup.ru/get_item/" + params.id)
        setItem(response.data.data[0])
    }

    useEffect(() => {
        getItemApi()
    }, [])

    const addItemCart = () => {
        let arrItems = [];
        if (localStorage.getItem('cart') !== null) {
            arrItems.push(...JSON.parse(localStorage.getItem('cart')))
        }
        arrItems.push(item.id)
        localStorage.setItem('cart', JSON.stringify([...new Set(arrItems)]))
        showToast('info', 'Ваша корзина пополнена')
    }

    return (
        <div className="item-main-block">
            <div className="item-block-img">
                <img className="item-img" src={"https://api.byup.ru/get_img/" + item.img_name}  alt=""/>
            </div>
            <div className="item-text-block">
                <div className="item-name">
                    <span>{item.item_name}</span>
                </div>
                <div className="item-description">
                    <span>Описание: {item.item_description}</span>
                </div>
                <div className="item-count">
                    <span>В наличии: {item.count} шт.</span>
                </div>
                <div className="item-price">
                    <span>{item.item_price} ₽</span>
                </div>
                <button onClick={addItemCart} className="item-button">Купить</button>
            </div>
        </div>
    );
};

export default ShopItem;