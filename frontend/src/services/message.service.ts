import {CreateMessageDto, IMessage} from "../types/message.type";
import {api} from "./axios.service";

export const getMessages = (): Promise<{ data: IMessage[] }> => {
    return api.get("/vault");
};

export const apiCreateMessage = (data: CreateMessageDto): Promise<{ data: IMessage }> => {
    return api.post("/vault", data);
};

export const deleteMessage = (id: string): Promise<void> => {
    return api.delete(`/vault/${id}`);
};