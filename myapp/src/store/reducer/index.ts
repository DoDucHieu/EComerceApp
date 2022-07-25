import { combineReducers } from "redux";
import userReducer, { UserReducer } from "./userReducer";
import cartReducer, { CartReducer } from "./cartReducer";

export interface RootReducer {
    userReducer: UserReducer;
    cartReducer: CartReducer;
}
const rootReducer = combineReducers({
    userReducer,
    cartReducer,
});

export default rootReducer;
