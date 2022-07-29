import { UserType } from "../../type";
import { AppDispatch, RootState } from "../store";
import { actionType } from "./actionType";
import { userApi } from "../../api/userApi";

const login = (userInfor: UserType) => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        const res = await userApi.login(userInfor);
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data,
        });
    };
};

const logout = () => {
    return async (dispatch: AppDispatch, getState: () => RootState) => {
        dispatch({
            type: actionType.LOG_OUT,
        });
    };
};

export const userAction = {
    login,
    logout,
};
