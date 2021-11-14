import React, {useEffect, useState} from 'react';
import "../styles/ShopMenu.css"

const ShopMenu = () => {
    const [items, setItems] = useState([{'id': 0, 'item_name': 'Server', 'item_description': 'Not', 'item_price': 0,
        'img_name': 'test', 'count': 777}])

    const [select, setSelect] = useState()

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

    const sortItems = (sort) => {
        setSelect(sort)
        if (sort === 'item_name'){
            setItems([...items].sort((a,b) => a[sort].localeCompare(b[sort])))
        } else if (sort === 'price-up'){
            setItems([...items].sort((a, b) => b['item_price'] - a['item_price']))
        } else if (sort === 'price-down'){
            setItems([...items].sort((a, b) => a['item_price'] - b['item_price']))
        }

    }


    return (
        <div>
            <div className="shop-selector">
                <div>
                    <select className="shop-selector-select" name="" id="" onChange={event => sortItems(event.target.value)}>
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
                            <img className="shop-img" src={"http://localhost:5000/get_img/" + item.img_name}  alt=""/>
                        </div>
                        <div className="shop-options">
                            <div>
                                <a className="shop-item-name" href={"/shop/" + item.id}>{item.item_name}</a>
                            </div>
                        </div>
                        <div className="shop-price">
                            <span className="shop-price-count">{item.item_price} ₽</span>
                            <button className="shop-item-cart">Купить
                            </button>
                            {/*<span className="shop-count">Осталось: {item.count} шт.</span>*/}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ShopMenu;