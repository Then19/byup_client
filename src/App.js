import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import NotFound from "./pages/NotFound";
import NavBar from "./components/NavBar";
import NewsPage from "./pages/NewsPage";


function App() {

    return (
        <BrowserRouter>
            <div className="App">
                <NavBar/>
                <Routes>
                    <Route path="/" element={<HomePage page="main"/>} />
                    <Route path="/shop" element={<ShopPage page="shop"/>} />
                    <Route path="/news" element={<NewsPage page="news"/>} />
                    <Route path="*" element={<NotFound />} status={404}/>
                </Routes>
            </div>
        </BrowserRouter>
    );
}

export default App;
