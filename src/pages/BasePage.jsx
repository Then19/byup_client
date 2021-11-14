import React from 'react';
import OnlineChat from "../components/OnlineChat";
import {ToastContainer} from "react-toastify";
import {useParams} from "react-router-dom";
import ShopItem from "../components/ShopItem";

const BasePage = ({page, ...props}) => {
    const params = useParams()

    return (
        <div>
            <ShopItem page={page}/>
            <OnlineChat page={page + params.id}/>
            <ToastContainer/>
        </div>
    );
};

export default BasePage;