import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const persistConfig = {
    key: "user",
    storage,
    whitelist: ["userReducer", "cartReducer"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// use applyMiddleware to add the thunk middleware to the store
const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);

const configureStore = {
    store,
    persistor,
};

export default configureStore;
