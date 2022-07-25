import actionType from "./actionType";
import userProductApi from "../../api/userProductApi";
import { RootState, AppDispatch } from "../store";

const getAllCart = (email: string) => {
    return async (dispatch: AppDispatch, getState: RootState) => {
        const res = await userProductApi.getAll(email);

        await dispatch({
            type: actionType.GET_ALL_CART,
            payload: res?.data?.data,
        });
    };
};

const cartAction = {
    getAllCart,
};
export default cartAction;
