import actionType from "./actionType";
import { CartType } from "../../type";
import userProductApi from "../../api/userProductApi";

const getAllCart = (email: string): any => {
    return async (dispatch: any, getState: any) => {
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
