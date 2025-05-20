export interface IMessage {
    id: string;
    title: string;
    message: string;
    availableAt: string;
    createdAt: string;
}

export interface CreateMessageDto {
    title: string;
    message: string;
    availableAt: string;
}