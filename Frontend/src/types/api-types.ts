import { User } from "./types";

export type MessageResponse = {
    message: string;
    success: boolean;
}

export type UserResponse = {
    success: boolean;
    user: User;
}