import actionType from "./actionType";
import userApi from "../../api/userApi";
import { UserType } from "../../type";
import { Dispatch } from "redux";
import { RootState } from "../store";

const login = (userInfor: UserType) => {
    return async (dispatch: Dispatch, getState: RootState) => {
        const res = await userApi.login(userInfor);
        dispatch({
            type: actionType.LOGIN_SUCCESS,
            payload: res.data,
        });
    };
};

const logout = () => {
    return async (dispatch: Dispatch, getState: RootState) => {
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
