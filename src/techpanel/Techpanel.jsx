import React, {useEffect, useState} from 'react';
import "../techpanel/styles/TechpanelLogin.css"
import {showToast} from "../tools/toast";

const Techpanel = () => {
    const [status, setStatus] = useState(false)

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')

    useEffect(() => {
        fetch("/login", {
            headers: {
                "type": "formData"
            }
        }).then(
            res => res.json()
        ).then(data => {
            setStatus(data.status)
        })
    }, [])


    function loginServer() {
        let data = new FormData()
        data.append('login', login)
        data.append('psw', password)
        fetch("/login", {
            method: "POST",
            body: data,
            headers: {
                "type": "formData"
            }
        }).then(
            res => res.json()
        ).then( data =>{
            setStatus(data.status)
        })
    }

    const [itemName ,setItemName] = useState('')
    const [itemDescription ,setItemDescription] = useState('')
    const [itemPrice ,setItemPrice] = useState('')
    const [itemImg ,setItemImg] = useState('')
    const [itemCount ,setItemCount] = useState('')

    function addItemDB () {
        let data = new FormData()
        data.append('item_name', itemName)
        data.append('item_description', itemDescription)
        data.append('item_price', itemPrice)
        data.append('img_name', itemImg)
        data.append('count', itemCount)
        fetch("/add_item", {
            method: "POST",
            body: data,
            headers: {
                "type": "formData"
            }
        }).then(
            r => r.json()
        ).then( data => {
            if (data.status === true){
                showToast('success', 'Новый товар успешно добавлен')
            } else {
                showToast('error', 'Что то пошло не так')
            }
        })
    }

    const [itemID, setItemID] = useState()

    function deleteItemDB () {
        let data = new FormData()
        data.append('itemID', itemID)
        fetch("/delete_item", {
            method: "POST",
            body: data,
            headers: {
                "type": "formData"
            }
        }).then(
            r => r.json()
        ).then( data => {
            if (data.status === true){
                showToast('success', 'Товар успешно удален')
            } else {
                showToast('error', 'Что то пошло не так')
            }
        })
    }


    if (status === true) {
        return (
            <div>
                <div className="tp-main">
                    <div className='tp-add-item-block'>
                        <span>Добавить товар</span>
                        <input className="tp-input" type="text" placeholder='Название товара' value={itemName} onChange={e => setItemName(e.target.value)}/>
                        <input className="tp-input" type="text" placeholder='Описание товара' value={itemDescription} onChange={e => setItemDescription(e.target.value)}/>
                        <input className="tp-input" type="text" placeholder='Цена' value={itemPrice} onChange={e => setItemPrice(e.target.value)}/>
                        <input className="tp-input" type="text" placeholder='Имя изображения' value={itemImg} onChange={e => setItemImg(e.target.value)}/>
                        <input className="tp-input" type="text" placeholder='Количество' value={itemCount} onChange={e => setItemCount(e.target.value)}/>
                        <button className="tp-button" onClick={() => addItemDB()}>Добавить товар</button>
                    </div>
                </div>
                <div className="tp-main">
                    <div className='tp-add-item-block'>
                        <span>Удалить товар по id</span>
                        <input className="tp-input" type="text" placeholder='ID' value={itemID} onChange={e => setItemID(e.target.value)}/>
                        <button className="tp-button" onClick={() => deleteItemDB()}>Удалить товар</button>
                    </div>
                </div>
            </div>


        );
    } else {
        return (
            <div>
                <div className="tp-main-login">
                    <div className="tp-login">
                        <div className="tp-pnh-text">
                            <span>ВАМ ЗДЕСЬ НЕ РАДЫ</span>
                        </div>
                        <input type="text" placeholder="Введите логин" value={login} onChange={e => setLogin(e.target.value)}/>
                        <input type="password" placeholder="Введите пароль" value={password} onChange={e => setPassword(e.target.value)}/>
                        <button onClick={loginServer}>login</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Techpanel;