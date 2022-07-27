import { userProductApi } from "../../api/userProductApi";
import { CartType } from "../../type";
import { RootState, AppDispatch } from "../store";
import { actionType } from "./actionType";

const getAllCart = (email: string) => {
    return async (dispatch: AppDispatch, getState: RootState) => {
        const res = await userProductApi.getAll(email);

        const arrData = res?.data?.data;
        const arrProduct: CartType[] = arrData.map((product: any) => {
            return {
                productId: product?.productId?._id,
                quantity: product?.quantity,
                price: product?.productId?.price,
                imgUrl: product.productId?.imgUrl,
                productName: product.productId?.productName,
            };
        });
        await dispatch({
            type: actionType.GET_ALL_CART,
            payload: arrProduct,
        });
    };
};

const addToCart = (data: CartType) => {
    return async (dispatch: AppDispatch, getState: RootState) => {
        const res: any = await userProductApi.addToCart(data);
        dispatch({
            type: actionType.ADD_TO_CART,
            payload: data,
        });
    };
};

const removeFromCart = (data: CartType) => {
    return async (dispatch: AppDispatch, getState: RootState) => {
        const res: any = await userProductApi.removeFromCart(data);
        dispatch({
            type: actionType.REMOVE_FROM_CART,
            payload: data,
        });
    };
};

export const cartAction = {
    getAllCart,
    addToCart,
    removeFromCart,
};
