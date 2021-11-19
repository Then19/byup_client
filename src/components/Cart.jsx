import React, {useEffect, useState} from 'react';
import "../styles/Cart.css"
import {showToast} from "../tools/toast";

const Cart = () => {

    const [items, setItems] = useState([])
    const [offerWindow, setOfferWindow] = useState(-1)

    const [offerFirstName, setOfferFirstName] = useState("")
    const [offerLastName, setOfferLastName] = useState("")
    const [offerNumber, setOfferNumber] = useState("")
    const [offerAddress, setOfferAddress] = useState("")


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
            data.data.forEach(item => {
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

    function stateOfferWindow() {
        setOfferWindow(offerWindow * -1)
    }

    function checkValue() {
        if (offerFirstName.length < 1 || offerLastName < 1 || offerNumber < 1 || offerAddress < 1) {
            showToast('error', 'Пожалуйста заполните все поля')
            return false
        }
        return true
    }

    function renderOffer () {
        if (offerWindow === 1){
            return (
                <div className="Cart-offer-main-block">
                    <div className="Cart-offer-block">
                        <input className="Cart-offer-input" placeholder={"Ваше имя"} value={offerFirstName} onChange={e => setOfferFirstName(e.target.value)} type="text"/>
                        <input className="Cart-offer-input" placeholder={"Ваша фамилия"} value={offerLastName} onChange={e => setOfferLastName(e.target.value)} type="text"/>
                        <input className="Cart-offer-input" placeholder={"Номер телефона"} value={offerNumber} onChange={e => setOfferNumber(e.target.value)} type="text"/>
                        <input className="Cart-offer-input" placeholder={"Адрес"} value={offerAddress} onChange={e => setOfferAddress(e.target.value)} type="text"/>
                        <button onClick={checkValue}>Проверить</button>
                    </div>
                </div>
            );
        }
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
                    <button onClick={stateOfferWindow} className="Cart-offer-button">Перейти к оформлению</button>
                </div>
            </div>
            {renderOffer()}
        </div>
    );
};

export default Cart;