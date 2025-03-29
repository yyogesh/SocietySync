import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth.types";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
  }
});

export const { } = authSlice.actions;
export default authSlice.reducer;