import {createBrowserRouter, Navigate} from "react-router-dom";
import {HomeLayout} from "./components/HomeLayout/HomeLayout";
import {RegisterPage} from "./components/RegisterPage/RegisterPage";
import {LoginPage} from "./components/LoginPage/LoginPage";
import {PrivateRoute} from "./components/PrivateRoute/PrivateRoute";
import {MessagesPage} from "./components/MessagesPage/MessagesPage";

export const router = createBrowserRouter([
    {
       path:"/",element:<HomeLayout/>,children:[
            {index: true,element:<Navigate to={'/register'}/>},
            {path:'/register',element:<RegisterPage/>},
            {path:'/login',element:<LoginPage/>},
            {path: '/messages', element:<PrivateRoute><MessagesPage/></PrivateRoute>}
        ]
    }
])