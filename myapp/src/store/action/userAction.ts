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

const logout = (): any => {
    return async (dispatch: any, getState: any) => {
        dispatch({
            type: actionType.LOG_OUT,
        });
    };
};

const userAction = {
    login,
    logout,
};
export default userAction;
