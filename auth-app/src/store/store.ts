// src/store/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer, PersistConfig } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { useDispatch } from 'react-redux';
import authReducer from '../features/auth/authSlice';
import toolsReducer from '../features/tools/toolsSlice';

// Combine reducers for your store slices
const rootReducer = combineReducers({
  auth: authReducer,
  tools: toolsReducer,
});

// Type for PersistConfig to add typing safety
const persistConfig: PersistConfig<ReturnType<typeof rootReducer>> = {
  key: 'root',
  storage,
  // whitelist: ['auth', 'tools'], // optionally limit persisted slices
};

// Create a persisted reducer with redux-persist
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store with persisted reducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // disable for redux-persist compatibility
    }),
});

// Create persistor for redux-persist
export const persistor = persistStore(store);

// Types for RootState and AppDispatch to use in hooks and selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed useDispatch hook for your app
export const useAppDispatch = () => useDispatch<AppDispatch>();
