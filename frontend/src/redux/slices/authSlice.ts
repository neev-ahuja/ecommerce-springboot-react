import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { authApi } from '../../api/authApi';
import { userApi } from '../../api/userApi';
import type { LoginRequest, RegisterRequest } from '../../api/authApi';
import type { Users } from '../../api/types';

interface AuthState {
    user: Users | null;
    token: string | null;
    isAuthenticated: boolean;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
}

const token = localStorage.getItem('token');

const initialState: AuthState = {
    user: null,
    token: token,
    isAuthenticated: !!token,
    status: 'idle',
    error: null,
};

export const loginUser = createAsyncThunk(
    'auth/login',
    async (credentials: LoginRequest, { rejectWithValue }) => {
        try {
            const data = await authApi.login(credentials);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Login failed');
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (credentials: RegisterRequest, { rejectWithValue }) => {
        try {
            const data = await authApi.register(credentials);
            return data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data || 'Registration failed');
        }
    }
);

export const getUser = createAsyncThunk(
    'auth/getUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await userApi.getUser();
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.status);
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isAuthenticated = false;
            state.status = 'idle';
            state.error = null;
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder
            // Login
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = 'succeeded';
                state.token = action.payload;
                state.isAuthenticated = true;
                // We might want to fetch user here immediately, or let the component do it
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Register
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            // Get User
            .addCase(getUser.pending, () => {
                // We might not want to set global status to loading for background fetch?
                // keeping it simple for now
            })
            .addCase(getUser.fulfilled, (state, action: PayloadAction<Users>) => {
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getUser.rejected, (state, action) => {
                if (action.payload === 401) {
                    // Token expired or invalid
                    state.user = null;
                    state.token = null;
                    state.isAuthenticated = false;
                    localStorage.removeItem('token');
                }
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
