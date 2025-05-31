import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'; // ✅ type-only import

interface User {
  name: string;
  email: string;
  password: string;
  token? : string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signup(state, action: PayloadAction<User>) {
      const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
    },
    login(state, action: PayloadAction<{ email: string; password: string; token: string; user: User }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;
      localStorage.setItem('token', action.payload.token);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('token');
    },
    loadUserFromStorage(state) {
      const token = localStorage.getItem('token');
      if (token) {
        // Find user associated with token (simulate)
        const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');
        // For demo, just pick first user if token exists
        state.token = token;
        state.isAuthenticated = true;
        state.user = users[0] || null;
      }
    },
  },
});

export const { signup, login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;