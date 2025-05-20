import {CreateMessageDto, IMessage} from "../../types/message.type";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getMessages} from "../../services/message.service";
import {apiCreateMessage} from "../../services/message.service";

interface MessageState {
    messages: IMessage[];
    loading: boolean;
    error: string | null;
}

const initialState: MessageState = {
    messages: [],
    loading: false,
    error: null,
};

export const fetchMessages = createAsyncThunk(
    "messages/fetch",
    async (_, thunkAPI) => {
    try {
        const res = await getMessages();
        return res.data;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to fetch Message");
    }
});

export const createMessage = createAsyncThunk(
    "messages/create",
    async (data: CreateMessageDto, thunkAPI) => {
        try {
            const res = await apiCreateMessage(data);
            return res.data;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to create message");
        }
    }
);

export const deleteMessage = createAsyncThunk(
    "messages/delete",
    async (id: string, thunkAPI) => {
        try {
            await deleteMessage(id);
            return id;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.response?.data?.error || "Failed to delete message");
        }
    }
);

const messagesSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.loading = false;
                state.messages = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(createMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
            })
            .addCase(createMessage.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteMessage.fulfilled, (state, action) => {
                state.messages = state.messages.filter((m) => m.id !== action.payload);
            })
            .addCase(deleteMessage.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    },
});

const {reducer:messageReducer} = messagesSlice

export {messageReducer}