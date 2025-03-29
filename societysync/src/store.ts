import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice"; 

export const store = configureStore({
    reducer: {
        // Add your reducers here
         auth: authReducer,
    },
    devTools: process.env.NODE_ENV !== "production",
})

export type RootState = ReturnType<typeof store.getState>; // Inferred type: { posts: PostsState, comments: CommentsState, users: UsersState, ... }
export type AppDispatch = typeof store.dispatch; // distpatch some action to the store for update or change the state