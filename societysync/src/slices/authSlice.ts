import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, LoginCredentials, PasswordChangeData, PasswordResetData, User } from "../types/auth.types";
import { SignupFormData } from "../utils/schemas";
import { changePassword, login, logout, resetPassword, userRegister } from "../services/authService";

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
}

// Login user
export const loginUser = createAsyncThunk("auth/login", async (credentials: LoginCredentials, { rejectWithValue }) => {
  try {
    return await login(credentials)
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

// Register User
export const registerUser = createAsyncThunk('auth/register', async (user: SignupFormData, { rejectWithValue }) => {
  try {
    return await userRegister(user);
  } catch (error: any) {
    return rejectWithValue(error.message);
  }
});

// Logout user
export const logoutUser = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
  try {
    await logout()
    return null
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})


// Reset password
export const resetUserPassword = createAsyncThunk(
  "auth/resetPassword",
  async (data: PasswordResetData, { rejectWithValue }) => {
    try {
      await resetPassword(data)
      return true
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)

// Change password
export const changeUserPassword = createAsyncThunk(
  "auth/changePassword",
  async (data: PasswordChangeData, { rejectWithValue }) => {
    try {
      await changePassword(data)
      return true
    } catch (error: any) {
      return rejectWithValue(error.message)
    }
  },
)


const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
      state.loading = false;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message as string;
      })
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload as string;
      });
    }
});

export const { setUser, clearError } = authSlice.actions;
export default authSlice.reducer;