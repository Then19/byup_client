import React from 'react';
import {ToastContainer} from "react-toastify";
import Main from "../components/Main";

const HomePage = ({page, ...props}) => {
    return (
        <div>
            <Main />
            <ToastContainer/>
        </div>
    );
};

export default HomePage;