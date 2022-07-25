import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userProductApi } from "../../api/userProductApi";
import { cartAction } from "../../store/action/cartAction";
import { RootState, AppDispatch } from "../../store/store";
import { CartType } from "../../type";

export const Cart = () => {
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();

    const arrProduct = useSelector(
        (state: RootState) => state.cartReducer.arrProduct,
    );
    const userEmail = useSelector(
        (state: RootState) => state.userReducer.email,
    );

    function handleCalculateTotal(arrProduct: CartType[]) {
        let total = 0;
        arrProduct.map((item: any) => {
            total += item?.quantity * item?.productId?.price;
        });
        return total;
    }
    const total = handleCalculateTotal(arrProduct);
    const handleIncreaseDecrease = async (
        productId: string,
        quantity: number,
    ) => {
        try {
            const data: CartType = {
                email: userEmail,
                productId,
                quantity,
            };
            await userProductApi.addToCart(data);
            await dispatch(cartAction.getAllCart(userEmail));
        } catch (e) {
            console.log(e);
        }
    };

    const handleRemoveFromCart = async (productId: string) => {
        try {
            const data: CartType = {
                email: userEmail,
                productId: productId,
            };
            await userProductApi.removeFromCart(data);
            await dispatch(cartAction.getAllCart(userEmail));
        } catch (e) {
            console.log(e);
        }
    };
    const handleContinueShopping = () => {
        navigate("/product");
    };

    return (
        <>
            <div className="bg-white">
                <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
                    <div className="mt-8 flex">
                        <div className="flow-root w-2/3">
                            <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                            >
                                {arrProduct && arrProduct.length > 0 ? (
                                    arrProduct.map((product: any) => (
                                        <li
                                            key={product?.productId}
                                            className="flex py-6"
                                        >
                                            <div className="h-40 w-40 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                <img
                                                    src={
                                                        product?.productId
                                                            .imgUrl
                                                    }
                                                    alt={
                                                        product?.productId
                                                            ?.productName
                                                    }
                                                    className="h-full w-full object-cover object-center"
                                                />
                                            </div>

                                            <div className="ml-4 flex flex-1 flex-col">
                                                <div>
                                                    <div className="flex justify-between text-base font-medium text-gray-900 mr-10">
                                                        <h3>
                                                            <p>
                                                                {
                                                                    product
                                                                        ?.productId
                                                                        ?.productName
                                                                }
                                                            </p>
                                                        </h3>
                                                        <p className="ml-4 text-red-600">
                                                            {`${product?.productId?.price} $`}
                                                        </p>
                                                    </div>
                                                    <p className="mt-1 text-sm text-indigo-600">
                                                        Quantity:{" "}
                                                        {product.quantity}
                                                    </p>
                                                </div>
                                                <div className="flex flex-1 items-end justify-between text-sm mr-10">
                                                    <p className="text-indigo-600 font-bold">
                                                        <button
                                                            className="mx-2 bg-gray-200 w-8 h-8 rounded"
                                                            onClick={() => {
                                                                product?.quantity >
                                                                1
                                                                    ? handleIncreaseDecrease(
                                                                          product
                                                                              ?.productId
                                                                              ?._id,
                                                                          -1,
                                                                      )
                                                                    : handleRemoveFromCart(
                                                                          product?.productId,
                                                                      );
                                                            }}
                                                        >
                                                            -
                                                        </button>
                                                        <button
                                                            className="mx-2 bg-gray-200 w-8 h-8 rounded"
                                                            onClick={() =>
                                                                handleIncreaseDecrease(
                                                                    product
                                                                        ?.productId
                                                                        ?._id,
                                                                    1,
                                                                )
                                                            }
                                                        >
                                                            +
                                                        </button>
                                                    </p>

                                                    <div className="flex">
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500 bg-gray-200 h-8 rounded px-4"
                                                            onClick={() =>
                                                                handleRemoveFromCart(
                                                                    product
                                                                        ?.productId
                                                                        ?._id,
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <h1 className="text-red-500">Empty cart</h1>
                                )}
                            </ul>
                        </div>
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6 w-1/3">
                            <div className="flex justify-between text-base font-medium text-red-600">
                                <p>Total: </p>
                                <p>{`${total} $`}</p>
                            </div>
                            <p className="mt-0.5 text-sm text-gray-500">
                                Shipping and taxes calculated at checkout.
                            </p>
                            <div className="mt-6">
                                <button className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 w-full">
                                    Save
                                </button>
                            </div>
                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                <p>
                                    or{" "}
                                    <button
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                        onClick={handleContinueShopping}
                                    >
                                        Continue Shopping
                                        <span aria-hidden="true"> &rarr;</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
