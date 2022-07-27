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
                arrProduct: [
                    ...handleIncreaDecreaProduct(
                        state.arrProduct,
                        action.payload,
                    ),
                ],
            };
        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
                arrProduct: [
                    ...handleRemoveFromCart(
                        state.arrProduct,
                        action.payload.productId,
                    ),
                ],
            };
        default:
            return state;
    }
};

const handleIncreaDecreaProduct = (arr: CartType[], data: CartType) => {
    let checkExist = false;
    let newArr: CartType[] = [...arr];
    newArr.forEach((product: CartType) => {
        if (
            product.productId === data.productId &&
            product.quantity &&
            data.quantity
        ) {
            checkExist = true;
            product.quantity += data.quantity;
        }
    });
    if (!checkExist) {
        newArr = [...newArr, data];
    }
    return newArr;
};

const handleRemoveFromCart = (arr: CartType[], productId: string) => {
    const newArr = arr.filter((item) => {
        return item.productId !== productId;
    });
    return newArr;
};
