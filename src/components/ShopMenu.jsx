import React, {useEffect, useState} from 'react';
import "../styles/ShopMenu.css"

const ShopMenu = () => {
    const [items, setItems] = useState([{'id': 0, 'item_name': 'Server', 'item_description': 'Not', 'item_price': 0,
        'img_name': 'test', 'count': 777}])

    useEffect(() => {
        fetch("/get_items", {
            headers: {
                "type": "formData"
            }
        }).then(
            res => res.json()
        ).then(data => {
            setItems(data.data)
        })
    }, [])


    return (
        <div className="shop-menu">
            {items.map(item =>
                <div className="shop-card" key={item.id}>
                    <div className="shop-img-block">
                        <img className="shop-img" src={"http://localhost:5000/get_img/" + item.img_name}  alt=""/>
                    </div>
                    <div className="shop-options">
                        <div>
                            <a className="shop-item-name" href={"/item/" + item.id}>{item.item_name}</a>
                        </div>
                        <div>
                            <button className="shop-item-cart">
                            </button>
                        </div>
                    </div>
                    <div className="shop-price">
                        <span className="shop-count">Осталось: {item.count} шт.</span>
                        <span >{item.item_price} ₽</span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShopMenu;