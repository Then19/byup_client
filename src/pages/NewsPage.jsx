import React from 'react';
import OnlineChat from "../components/OnlineChat";
import {ToastContainer} from "react-toastify";

const NewsPage = ({page, ...props}) => {
    return (
        <div>
            <OnlineChat page={page}/>
            <ToastContainer/>
        </div>
    );
};

export default NewsPage;