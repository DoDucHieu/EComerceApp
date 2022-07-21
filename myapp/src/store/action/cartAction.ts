import actionType from "./actionType";
import { CartType } from "../../type";
import userProductApi from "../../api/userProductApi";
import axios from "axios";

const getAllCart = (email: CartType): any => {
    return async (dispatch: any, getState: any) => {
        const res = await userProductApi.getAll(email);

        dispatch({
            type: actionType.GET_ALL_CART,
            payload: res?.data?.data,
        });
    };
};

const addToCart = (data: any) => {
    return async (dispatch: any, getState: any) => {
        if (data) {
            dispatch({
                type: actionType.ADD_TO_CART,
                payload: data,
            });
        }
    };
};

const removeFromCart = (url: string) => {
    return async (dispatch: any, getState: any) => {
        const res = await axios.get(url);
        if (res) {
            dispatch({
                type: actionType.REMOVE_FROM_CART,
                payload: res.data,
            });
        }
    };
};

const cartAction = {
    getAllCart,
    addToCart,
    removeFromCart,
};
export default cartAction;
