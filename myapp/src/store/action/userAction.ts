import actionType from "./actionType";
import userApi from "../../api/userApi";
import { UserType } from "../../type";
import axios from "axios";

const login = (userInfor: UserType): any => {
    return async (dispatch: any, getState: any) => {
        const res = await userApi.login(userInfor);
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data,
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

const userAction = {
    login,
    addToCart,
    removeFromCart,
};
export default userAction;
