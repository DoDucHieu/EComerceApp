import { combineReducers } from "redux";
import userReducer, { IUserReducer } from "./userReducer";
import cartReducer, { ICartReducer } from "./cartReducer";

export interface IRootReducer {
    userReducer: IUserReducer;
    cartReducer: ICartReducer;
}
const rootReducer = combineReducers({
    userReducer,
    cartReducer,
});

export default rootReducer;
