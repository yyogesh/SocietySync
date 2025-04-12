import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; 
import authReducer from "./slices/authSlice"; 
import { loggerMiddleware } from "./middleware/logger";

export const store: any = configureStore({
    reducer: {
        // Add your reducers here
         auth: authReducer,
         user: userReducer
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(loggerMiddleware),
})

export type RootState = ReturnType<typeof store.getState>; // Inferred type: { posts: PostsState, comments: CommentsState, users: UsersState, ... }
export type AppDispatch = typeof store.dispatch; // distpatch some action to the store for update or change the state