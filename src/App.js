import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import NewsPage from "./pages/NewsPage";
import BasePage from "./pages/BasePage";
import CartPage from "./pages/CartPage";
import TechpanelPage from "./techpanel/TechpanelPage";


function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage page="main"/>} />
                    <Route path="/news" element={<NewsPage page="news"/>} />
                    <Route path="/shopcart" element={<CartPage/>} />
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
