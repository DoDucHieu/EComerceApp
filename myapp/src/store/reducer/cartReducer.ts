import { CartType } from "../../type";
import actionType from "../action/actionType";

export interface ICartReducer {
    arrProduct: CartType[];
}

const initialState: ICartReducer = {
    arrProduct: [],
};

const cartReducer = (state: ICartReducer = initialState, action: any) => {
    switch (action.type) {
        case actionType.GET_ALL_CART:
            return {
                ...state,
                arrProduct: [...action.payload],
            };
        default:
            return state;
    }
};

export default cartReducer;
