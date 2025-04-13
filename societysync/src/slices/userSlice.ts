import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState } from "../types/user.types";
import { User } from "../types/auth.types";

const initialState: UserState = {
    users: [],
    selectedUser: null,
    isLoading: false,
    error: null,
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex(user => user.uid === action.payload.uid);
            if (index !== -1) {
                state.users[index] = action.payload;
            } else {
                state.selectedUser = action.payload;
            }
        }
    }
});

export const { updateUser } = userSlice.actions;
export default userSlice.reducer;
