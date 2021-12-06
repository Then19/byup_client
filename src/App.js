import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import BasePage from "./pages/BasePage";
import CartPage from "./pages/CartPage";
import TechpanelPage from "./techpanel/TechpanelPage";
import AboutPage from "./pages/AboutPage";


function App() {

    return (
        <BrowserRouter>
            <NavBar/>
            <div className="App">
                <Routes>
                    <Route path="/" element={<HomePage page="main"/>} />
                    <Route path="/shopcart" element={<CartPage/>} />
                    <Route path="/about" element={<AboutPage/>} />
                    <Route exact path="/shop" element={<ShopPage page="shop"/>} />
                    <Route exact path="/shop/:id" element={<BasePage page="shop"/>} />
                    <Route path="/techpanel" element={<TechpanelPage/>} />
                    <Route path="*" element={<NotFound />} status={404}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
