import React from 'react';
import {ToastContainer} from "react-toastify";
import ShopMenu from "../components/ShopMenu";

const ShopPage = ({page, ...props}) => {
    return (
        <div>
            <ShopMenu/>
            <ToastContainer/>
        </div>
    );
};

export default ShopPage;