import React from 'react';
import {ToastContainer} from "react-toastify";
import Cart from "../components/Cart";

const CartPage = () => {
    return (
        <div>
            <Cart/>
            <ToastContainer/>
        </div>
    );
};

export default CartPage;