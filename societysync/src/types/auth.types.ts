import { Timestamp } from "firebase/firestore";
import { SignupFormData } from "../utils/schemas";

export interface User extends SignupFormData {
    uid: string;
    createdAt: Date | Timestamp
    updatedAt: Date | Timestamp
    token?: string | null
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean
    loading: boolean
    error: string | null
}