import { CartType } from "../../type";
import { actionType } from "../action/actionType";

export interface CartReducer {
    arrProduct: CartType[];
}

const initialState: CartReducer = {
    arrProduct: [],
};

export const cartReducer = (state: CartReducer = initialState, action: any) => {
    switch (action.type) {
        case actionType.GET_ALL_CART:
            return {
                ...state,
                arrProduct: [...action.payload],
            };
        case actionType.ADD_TO_CART:
            return {
                ...state,
                arrProduct: [...action.payload],
            };
        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                arrProduct: [...action.payload],
            };
        default:
            return state;
    }
};
