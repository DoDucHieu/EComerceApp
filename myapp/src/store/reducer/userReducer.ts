import actionType from "../action/actionType";

export interface IUserReducer {
    email: string;
    accessToken: string;
}

const initialState: IUserReducer = {
    email: "",
    accessToken: "",
};

const userReducer = (state: IUserReducer = initialState, action: any) => {
    switch (action.type) {
        case actionType.LOGIN_SUCCESS:
            return {
                ...state,
                email: action.payload.email,
                accessToken: action.payload.accessToken,
            };
        case actionType.LOG_OUT:
            return {
                ...state,
                email: "",
                accessToken: "",
            };

        default:
            return state;
    }
};

export default userReducer;
