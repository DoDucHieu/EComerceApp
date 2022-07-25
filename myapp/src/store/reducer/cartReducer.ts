import { Store } from "redux";
import { CartType } from "../../type";
import actionType from "../action/actionType";

export interface CartReducer {
    arrProduct: CartType[];
}

const initialState: CartReducer = {
    arrProduct: [],
};

const cartReducer = (state: CartReducer = initialState, action: any) => {
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
