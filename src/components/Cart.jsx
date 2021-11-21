import React, {useEffect, useState} from 'react';
import "../styles/Cart.css"
import {showToast} from "../tools/toast";
import axios from "axios";

const Cart = () => {

    const [items, setItems] = useState([])
    const [offerWindow, setOfferWindow] = useState(-1)

    const [offerFirstName, setOfferFirstName] = useState("")
    const [offerLastName, setOfferLastName] = useState("")
    const [offerNumber, setOfferNumber] = useState("")
    const [offerAddress, setOfferAddress] = useState("")
    const [offerComment, setOfferComment] = useState("")

    async function getItemsAPI() {
        const response = await axios.get("https://api.byup.ru/get_items")

        let cartMap = JSON.parse(localStorage.getItem('cart'))
        let tmpArr = [];
        response.data.data.forEach(item => {
            if (cartMap !== null) {
                if (cartMap.includes(item.id)) {
                    tmpArr.push(item)
                }
            }
        })
        setItems(tmpArr)
    }

    useEffect(() => {
        getItemsAPI()
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

    function renderOfferSuccess (){
        if (offerWindow === 1){
            return (
                <div className="Cart-offer-main-block">
                    <div className="Cart-offer-block">
                        <div className="Cart-offer-close">
                            <div className="Cart-offer-title">
                                Оформление заказа
                            </div>
                            <button className="Cart-offer-button-close" onClick={stateOfferWindow}>X</button>
                        </div>
                        <div className={"Cart-offer-success-text"}>
                            <p>Заказ принят, в скором времени с вами свяжется оператор.</p> <br/>
                            <p>Прошу обратить внимание: мы работаем только на территории Тюмени.</p>
                        </div>
                    </div>
                </div>
            );
        }
    }

    if (items.length === 0) {
        return (
            <div>
                <div className="Cart-none">
                    Ваша корзина пуста
                </div>
                {renderOfferSuccess()}
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

    async function sendOffer() {
        if (checkValue() === false){
            return
        }
        let data = new FormData()
        data.append('user_firstname', offerFirstName)
        data.append('user_lastname', offerLastName)
        data.append('user_number', offerNumber)
        data.append('user_address', offerAddress)
        data.append('user_comment', offerComment)
        data.append('offer_items', localStorage.getItem('cart'))

        const response = await axios({
            url: 'https://api.byup.ru/add_offer',
            method: 'POST',
            data: data,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
        })

        if (response.data.status === true) {
            showToast('success', 'Заказ принят, ожидайте звонка оператора')
            setOfferFirstName("")
            setOfferLastName("")
            setOfferNumber("")
            setOfferAddress("")
            setOfferComment("")
            localStorage.setItem('cart', JSON.stringify([]))
            setItems([])
        } else {
            showToast('error', "Что то пошло не так")
        }
    }

    function renderOffer () {
        if (offerWindow === 1){
            return (
                <div className="Cart-offer-main-block">
                    <div className="Cart-offer-block">
                        <div className="Cart-offer-close">
                            <div className="Cart-offer-title">
                                Оформление заказа
                            </div>
                            <button className="Cart-offer-button-close" onClick={stateOfferWindow}>X</button>
                        </div>
                        <input className="Cart-offer-input" placeholder={"Имя"} value={offerFirstName} onChange={e => setOfferFirstName(e.target.value)} type="text"/>
                        <input className="Cart-offer-input" placeholder={"Фамилия"} value={offerLastName} onChange={e => setOfferLastName(e.target.value)} type="text"/>
                        <input className="Cart-offer-input" placeholder={"Номер телефона"} value={offerNumber} onChange={e => setOfferNumber(e.target.value)} type="text"/>
                        <input className="Cart-offer-input" placeholder={"Адрес"} value={offerAddress} onChange={e => setOfferAddress(e.target.value)} type="text"/>
                        <textarea className="Cart-offer-input" rows="3" placeholder="Комментарий к заказу" value={offerComment} onChange={e => setOfferComment(e.target.value)}/>
                        <div className="Cart-offer-accept-block">
                            <div>Сумма: <span className={"Cart-offer-span-price"}>{getCountPrice() + 200} ₽</span></div>
                            <button className="Cart-offer-success-button" onClick={sendOffer}>Заказать</button>
                        </div>
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
                                <img className="Cart-img" src={"https://api.byup.ru/get_img/" + item.img_name} alt=""/>
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
                    <span>Сумма заказа: <span className="Cart-offer-price">{getCountPrice()} ₽</span> + доставка 200 ₽</span>
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