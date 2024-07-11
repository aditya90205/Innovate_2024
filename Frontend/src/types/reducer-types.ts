import { User } from "firebase/auth";

export interface userReducerInitialState {
    user: User | null;
    loading: boolean;
}