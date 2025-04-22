import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import habitsReducer from './habitsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    habits: habitsReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false  // Ensure you're not accidentally storing non-serializable values in the store
    })
});

export default store;
