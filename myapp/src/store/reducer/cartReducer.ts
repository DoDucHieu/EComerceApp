import actionType from "../action/actionType";

const initialState = {
    arrProduct: ["Iphone 11"],
};

const cartReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.GET_ALL_CART:
            return {
                ...state,
                arrProduct: [...state.arrProduct, action.payload],
            };
        case actionType.ADD_TO_CART:
            return {
                ...state,
                arrProduct: [...state.arrProduct, action.payload],
            };
        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default cartReducer;
