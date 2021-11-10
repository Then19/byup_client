import React from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Test from "./components/Test";


function App() {

    return (
        <div className="App">
            <Test/>
            <ToastContainer />
        </div>
    );
}

export default App;
