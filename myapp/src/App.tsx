import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Cart from "./pages/cart/Cart";
import Header from "./components/header/header";

import HomePage from "./pages/homePage/HomePage";
import Product from "./pages/product/Product";
import Login from "./components/login/Login";
import { useSelector } from "react-redux";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
    const userAccessToken = useSelector(
        (state: any) => state.userReducer.accessToken,
    );
    return (
        <>
            <ToastContainer />
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />}></Route>
                <Route path="/product" element={<Product />}></Route>
                <Route
                    path="/cart"
                    element={
                        userAccessToken ? (
                            <Cart />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                ></Route>
                <Route path="/about" element={<HomePage />}></Route>
                <Route path="/login" element={<Login />}></Route>
            </Routes>
        </>
    );
}

export default App;
