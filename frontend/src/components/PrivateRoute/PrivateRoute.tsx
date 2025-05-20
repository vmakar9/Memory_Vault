import React from "react";
import {useAppSelector} from "../../hooks/reduxHook";
import {Navigate} from "react-router-dom";
interface PrivateRouteProps {
    children: JSX.Element;
}
export const PrivateRoute: React.FC<PrivateRouteProps>=({ children }) =>{
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
}

