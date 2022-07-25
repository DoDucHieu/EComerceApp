import { Route, Routes } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthRoute } from "./routes/authRoute";
import { RouteApp } from "./type";
import { Header } from "./components/header/header";
import { HomePage } from "./pages/homePage/HomePage";
import { Product } from "./pages/product/Product";
import { Cart } from "./pages/cart/Cart";
import { Login } from "./pages/login/Login";

const arrRoute: RouteApp[] = [
    {
        href: "/",
        isPublic: true,
        element: <HomePage />,
    },
    {
        href: "/product",
        isPublic: true,
        element: <Product />,
    },
    {
        href: "/cart",
        isPublic: false,
        element: <Cart />,
    },
    {
        href: "/login",
        isPublic: true,
        element: <Login />,
    },
];

export const App = () => {
    return (
        <>
            <ToastContainer />
            <Header />
            <Routes>
                {arrRoute.map((item: RouteApp) => {
                    return item.isPublic ? (
                        <Route path={item.href} element={item.element} />
                    ) : (
                        <Route
                            path={item.href}
                            element={<AuthRoute>{item.element}</AuthRoute>}
                        ></Route>
                    );
                })}
            </Routes>
        </>
    );
};
