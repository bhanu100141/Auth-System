import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface User {
  id: string;          // Added id field to uniquely identify users
  name: string;
  email: string;
  password: string;
  token?: string;
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

      // Prevent duplicate user registration by email
      const exists = users.find(u => u.email === action.payload.email);
      if (exists) {
        // Optionally, you can throw an error or just return here to avoid adding duplicate
        console.warn('User already exists with this email:', action.payload.email);
        return;
      }

      // Add id if missing (generate unique id)
      if (!action.payload.id) {
        action.payload.id = Date.now().toString();
      }

      users.push(action.payload);
      localStorage.setItem('users', JSON.stringify(users));
    },

    login(state, action: PayloadAction<{ email: string; password: string; token: string; user: User }>) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.user = action.payload.user;

      // Save token and full user to localStorage (full user includes id, email, password)
      localStorage.setItem('token', action.payload.token);
      localStorage.setItem('user', JSON.stringify(action.payload.user));
    },

    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;

      // Clear token and user from localStorage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },

    loadUserFromStorage(state) {
      const token = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (token && storedUser) {
        state.token = token;
        state.isAuthenticated = true;
        state.user = JSON.parse(storedUser);
      }
    },
  },
});

export const { signup, login, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
