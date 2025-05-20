import {configureStore} from "@reduxjs/toolkit";
import {authReducer} from "./slice/auth.slice";
import {messageReducer} from "./slice/message.slice";

export const store = configureStore({
    reducer:{
        auth: authReducer,
        messages: messageReducer,
    }
})