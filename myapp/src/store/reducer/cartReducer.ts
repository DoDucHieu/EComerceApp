import actionType from "../action/actionType";

const initialState = {
    arrProduct: ["iphone 12 pro max"],
};

const todoReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.ADD_TO_CART:
            return {
                ...state,
                todo: [...state.arrProduct, action.payload],
            };
        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default todoReducer;
