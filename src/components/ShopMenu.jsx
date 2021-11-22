import React, {useEffect, useState} from 'react';
import "../styles/ShopMenu.css"
import {showToast} from "../tools/toast";
import axios from "axios";

const ShopMenu = () => {
    const [items, setItems] = useState([{'id': 0, 'item_name': 'Server', 'item_description': 'Not', 'item_price': 0,
        'img_name': 'test', 'count': 777}])

    async function getItemsApi() {
        const response = await axios.get("https://api.byup.ru/get_items")
        setItems(response.data.data)
    }

    useEffect(() => {
        getItemsApi()
    }, [])

    const sortItems = (sort) => {
        if (sort === 'item_name'){
            setItems([...items].sort((a,b) => a[sort].localeCompare(b[sort])))
        } else if (sort === 'price-up'){
            setItems([...items].sort((a, b) => b['item_price'] - a['item_price']))
        } else if (sort === 'price-down'){
            setItems([...items].sort((a, b) => a['item_price'] - b['item_price']))
        }

    }

    const addItemCart = (item_numb) => {
        let arrItems = [];
        if (localStorage.getItem('cart') !== null) {
            arrItems.push(...JSON.parse(localStorage.getItem('cart')))
        }
        arrItems.push(item_numb)
        localStorage.setItem('cart', JSON.stringify([...new Set(arrItems)]))
        showToast('info', 'Ваша корзина пополнена')
    }


    return (
        <div>
            <div className="shop-selector">
                <div>
                    <select className="shop-selector-select" name="" id="" onChange={event => sortItems(event.target.value)}>
                        <option disabled value="">Сортировать по</option>
                        <option value="item_name">По названию</option>
                        <option value="price-up">Цена (сначала дорогие)</option>
                        <option value="price-down">Цена (сначала дешевые)</option>
                    </select>
                </div>
                <div>
                    <input className="shop-selector-select" type="text" placeholder="Поиск"/>
                </div>
            </div>
            <div className="shop-menu">
                {items.map(item =>
                    <div className="shop-card" key={item.id}>
                        <div className="shop-img-block">
                            <a href={"/shop/" + item.id}>
                                <img className="shop-img" src={"https://api.byup.ru/get_img/" + item.img_name}  alt=""/>
                            </a>
                        </div>
                        <div className="shop-options">
                            <div>
                                <a className="shop-item-name" href={"/shop/" + item.id}>{item.item_name}</a>
                            </div>
                        </div>
                        <div className="shop-price">
                            <span className="shop-price-count">{item.item_price}₽</span>
                            <button onClick={() => addItemCart(item.id)} className="shop-item-cart">Купить
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopMenu;