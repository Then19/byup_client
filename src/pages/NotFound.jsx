import React, {useEffect} from 'react';
import {ToastContainer} from "react-toastify";
import {showToast} from "../tools/toast";
import "../styles/NavBar.css"


const NotFound = () => {
    useEffect(() => {
        showToast("error", "Страница не найдена.")
    })


    return (
        <div>
            <h1 className="err">Page</h1>
            <h2 className="err">Not found</h2>
            <ToastContainer/>
        </div>
    );
};

export default NotFound;