import React, {useEffect, useState} from 'react';
import "../styles/Cart.css"
import {showToast} from "../tools/toast";

const Cart = () => {

    const [items, setItems] = useState([])

    useEffect(() => {
        fetch("/get_items", {
            headers: {
                "type": "formData"
            }
        }).then(
            res => res.json()
        ).then(data => {
            let cartMap = JSON.parse(localStorage.getItem('cart'))
            let tmpArr = [];
            data.data.map(item => {
                if (cartMap !== null) {
                    if (cartMap.includes(item.id)) {
                        tmpArr.push(item)
                    }
                }
            })
            setItems(tmpArr)
        })
    }, [])

    function removeCartItem(item) {
        let arrItems = items
        arrItems = arrItems.filter(function (a) {
            return a !== item
        })

        let arrLocal = JSON.parse(localStorage.getItem('cart'))
        arrLocal = arrLocal.filter(function (a) {
            return a !== item.id
        })
        localStorage.setItem('cart', JSON.stringify(arrLocal))
        setItems(arrItems)
        showToast('info', "Вы убрали из заказа: " + item.item_name)
    }

    if (items.length === 0) {
        return (
            <div className="Cart-none">
                Ваша корзина пуста
            </div>
        );
    }

    function getCountPrice() {
        let countPrice = 0
        items.map(item => countPrice +=item.item_price)
        return countPrice
    }


    return (
        <div>
            {items.map(item =>
                <div key={item.id} className="Cart-item-block">
                    <div className="Cart-item-first-block">
                        <div className="Cart-img-block">
                            <a href={"/shop/" + item.id}>
                                <img className="Cart-img" src={"http://localhost:5000/get_img/" + item.img_name} alt=""/>
                            </a>
                        </div>
                        <div className="Cart-item-main-name">
                            <div className="Cart-item-name-block">
                                <a className="Cart-item-name" href={"/shop/" + item.id}>{item.item_name}</a>
                            </div>
                            <div className="Cart-item-description-block">
                                <span>{item.item_description}</span>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className="Cart-button-delete" onClick={() => removeCartItem(item)}>Убрать</button>
                        <div className="Cart-price-block">
                            <span>{item.item_price} ₽</span>
                        </div>
                    </div>
                </div>
            )}
            <div className="Cart-offer">
                <div>
                    <span>Сумма заказа: <span className="Cart-offer-price">{getCountPrice()} ₽</span></span>
                </div>
                <div>
                    <button className="Cart-offer-button">Оформить заказ</button>
                </div>
            </div>
        </div>
    );
};

export default Cart;