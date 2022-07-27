import { Fragment, useEffect, useRef, useState } from "react";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { BellIcon, MenuIcon, XIcon } from "@heroicons/react/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartType } from "../../type";
import { RootState, AppDispatch } from "../../store/store";
import { cartAction } from "../../store/action/cartAction";
import { userAction } from "../../store/action/userAction";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
}

const navigation = [
    { name: "Home page", href: "/" },
    { name: "Product", href: "/product" },
];

export const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const dispatch: AppDispatch = useDispatch();

    const userAccessToken = useSelector(
        (state: RootState) => state.userReducer.accessToken,
    );
    const userEmail = useSelector(
        (state: RootState) => state.userReducer.email,
    );
    const arrProduct = useSelector(
        (state: RootState) => state.cartReducer.arrProduct,
    );

    const handleQuantityProduct = (arr: CartType[]) => {
        let total = 0;
        arr.map((item: CartType) => {
            total += item?.quantity ? item?.quantity : 0;
        }, 0);
        return total;
    };
    const num = handleQuantityProduct(arrProduct);

    const getAllCart = async (email: string) => {
        await dispatch(cartAction.getAllCart(email));
    };
    useEffect(() => {
        if (userEmail) {
            getAllCart(userEmail);
        }
    }, []);

    const handleLogin = () => {
        navigate("/login");
    };
    const handleLogout = async () => {
        await dispatch(userAction.logout());
        navigate("/login");
    };
    const handleOpenCart = () => {
        navigate("/cart");
    };
    console.log("header: ", arrProduct);

    return (
        <Disclosure as="nav" className="bg-gray-800">
            {({ open }) => (
                <>
                    <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
                        <div className="relative flex items-center justify-between h-16">
                            <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                                <div className="flex-shrink-0 flex items-center">
                                    <img
                                        className="block lg:hidden h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                                        alt="Workflow"
                                    />
                                    <img
                                        className="hidden lg:block h-8 w-auto"
                                        src="https://tailwindui.com/img/logos/workflow-logo-indigo-500-mark-white-text.svg"
                                        alt="Workflow"
                                    />
                                </div>
                                <div className="hidden sm:block sm:ml-6">
                                    <div className="flex space-x-4">
                                        {navigation?.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className={classNames(
                                                    item.href ===
                                                        location.pathname
                                                        ? "bg-gray-900 text-white"
                                                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                                                    "px-3 py-2 rounded-md text-sm font-medium",
                                                )}
                                                aria-current={
                                                    item.href ===
                                                    location.pathname
                                                        ? "page"
                                                        : undefined
                                                }
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                                <button
                                    type="button"
                                    className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-4 flex"
                                    onClick={handleOpenCart}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-6 w-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    <span className="absolute mt-3 ml-6">
                                        {num && num}
                                    </span>
                                </button>
                                {userAccessToken ? (
                                    <button
                                        type="button"
                                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-4"
                                        onClick={handleLogout}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                            />
                                        </svg>
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        className="bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white mr-4"
                                        onClick={handleLogin}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-6 w-6"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                            />
                                        </svg>
                                    </button>
                                )}

                                {/* Profile */}
                                <Menu as="div" className="ml-3 relative">
                                    <div>
                                        <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                            <span className="sr-only">
                                                Open user menu
                                            </span>
                                            <img
                                                className="h-8 w-8 rounded-full"
                                                src="https://vuongquocducchuatroi.net/wp-content/uploads/2014/02/SatanDevil.jpg"
                                                alt=""
                                            />
                                        </Menu.Button>
                                    </div>
                                </Menu>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Disclosure>
    );
};
