import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from "./components/Test";
import './styles/App.css'
import OnlineChat from "./components/OnlineChat";


function App() {

    return (
        <div className="App">
            <Test/>
            <OnlineChat/>
            <ToastContainer />
        </div>
    );
}

export default App;
