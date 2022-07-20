import React from "react";
import { Routes, Route } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Header from "./components/header/header";

import HomePage from "./pages/homePage/HomePage";
import Product from "./pages/product/Product";
import Login from "./components/login/Login";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/product" element={<Product />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/about" element={<HomePage />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    );
}

export default App;
