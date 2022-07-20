import actionType from "./actionType";
import axios from "axios";

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

const todoAction = {
    addToCart,
    removeFromCart,
};
export default todoAction;
