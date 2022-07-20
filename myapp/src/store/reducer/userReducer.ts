import actionType from "../action/actionType";

const initialState = {
    email: "",
    accessToken: "",
    cart: ["leesin", "yasua"],
};

const userReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                accessToken: action.payload.accessToken,
            };
        case actionType.ADD_TO_CART:
            return {
                ...state,
                cart: [...state.cart, action.payload],
            };
        case actionType.REMOVE_FROM_CART:
            return {
                ...state,
            };
        default:
            return state;
    }
};

export default userReducer;
