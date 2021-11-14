import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const ShopItem = ({page, ...props}) => {
    const params = useParams()

    const [item, setItem] = useState({'id': 0, 'item_name': 'Server', 'item_description': 'Not', 'item_price': 0,
        'img_name': 'test', 'count': 777})

    useEffect(() => {
        fetch("/get_item/" + params.id, {
            headers: {
                "type": "formData"
            }
        }).then(
            res => res.json()
        ).then(data => {
            setItem(data.data[0])
        })
    }, [])

    return (
        <div>
            <div>
                <img className="shop-img" src={"http://localhost:5000/get_img/" + item.img_name}  alt=""/>
            </div>
        </div>
    );
};

export default ShopItem;