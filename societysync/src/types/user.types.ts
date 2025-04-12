import { User } from "./auth.types"

export interface UserState {
    users: User[]
    selectedUser: User | null
    isLoading: boolean
    error: string | null
}