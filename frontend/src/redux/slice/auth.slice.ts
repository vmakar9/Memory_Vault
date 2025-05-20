import {IUser} from "../../types/user.type";
import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {IAuthCredentials} from "../../types/auth.type";
import {checkSession, signIn, signOut, signUp} from "../../services/auth.service";

interface AuthState {
    user: IUser | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    error: string | null;
    isAuthenticated: boolean;
}

const initialState: AuthState = {
    user: null,
    status: "idle",
    error: null,
    isAuthenticated: false
};

export const signUpUser = createAsyncThunk(
    "auth/signUp",
    async (credentials: IAuthCredentials, thunkAPI) => {
        try {
            const res = await signUp(credentials);
            return res.data.user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.error || "Signup failed");
        }
    }
);

export const signInUser = createAsyncThunk(
    "auth/signIn",
    async (credentials: IAuthCredentials, thunkAPI) => {
        try {
            const res = await signIn(credentials);
            return res.data.user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue(e.response?.data?.error || "Signin failed");
        }
    }
);

export const signOutUser = createAsyncThunk(
    "auth/signOut",
    async (_,thunkAPI) => {
    try {
        await signOut()
    }catch (e: any) {
        return thunkAPI.rejectWithValue(e.response?.data?.error || "Error sign out")
    }
});

export const checkAuth = createAsyncThunk(
    "auth/checkAuth",
    async (_, thunkAPI) => {
        try {
            const { user } = await checkSession();
            return user;
        } catch (e: any) {
            return thunkAPI.rejectWithValue("Session expired or unauthorized");
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action: PayloadAction<{ user: IUser }>) => {
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        clearCredentials: (state) => {
            state.user = null;
            state.isAuthenticated = false;
        },
    },
    extraReducers(builder) {
        builder
            .addCase(signUpUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(signInUser.fulfilled, (state, action) => {
                state.user = action.payload;
                state.status = "succeeded";
                state.error = null;
                state.isAuthenticated = true
            })
            .addCase(signOutUser.fulfilled, (state) => {
                state.user = null;
                state.status = "idle";
                state.isAuthenticated = false
            })
            .addCase(checkAuth.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = true;
                state.status = "succeeded";
            })
            .addMatcher(
                (action) => action.type.endsWith("/rejected"),
                (state, action: any) => {
                    state.status = "failed";
                    state.error = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.endsWith("/pending"),
                (state) => {
                    state.status = "loading";
                    state.error = null;
                }
            );
    },
});

const {reducer:authReducer} = authSlice

export {authReducer}