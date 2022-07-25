import { Navigate } from "react-router-dom";

import { useSelector } from "react-redux";

import "react-toastify/dist/ReactToastify.css";
import { RootState } from "../store/store";

export const AuthRoute = ({ children }: { children: JSX.Element }) => {
    const userAccessToken = useSelector(
        (state: RootState) => state.userReducer.accessToken,
    );
    return <>{userAccessToken ? children : <Navigate to="/login" replace />}</>;
};
