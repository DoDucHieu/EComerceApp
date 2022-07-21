import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import cartAction from "../../store/action/cartAction";

const Cart = () => {
    const dispatch = useDispatch();
    const userEmail = useSelector((state: any) => state.userReducer.email);
    const arrProduct = useSelector(
        (state: any) => state.cartReducer.arrProduct,
    );

    const getAllCart = async (email: any) => {
        await dispatch(cartAction.getAllCart(email));
    };
    useEffect(() => {
        if (userEmail) {
            getAllCart(userEmail);
        }
    }, []);
    console.log("arr: ", arrProduct);

    return (
        <>
            {arrProduct &&
                arrProduct.map((item: string) => {
                    return <h1 className="px-20 ">{item}</h1>;
                })}
        </>
    );
};

export default Cart;
