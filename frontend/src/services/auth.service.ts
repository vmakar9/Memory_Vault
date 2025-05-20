
import {api} from "./axios.service";
import {IAuthCredentials} from "../types/auth.type";
import {IUser} from "../types/user.type";

export const signUp = (credentials:IAuthCredentials)=>{
   return  api.post('/auth/signUp', credentials)
}

export const signIn = (credentials:IAuthCredentials) =>{
    return api.post("/auth/signIn", credentials);
}

export const signOut = () => api.post("/auth/signOut");

export const checkSession = async (): Promise<{ user: IUser }> => {
    const {data} = await api.get("/auth/session");
    return data.user;
};