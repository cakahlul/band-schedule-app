import { configureStore } from '@reduxjs/toolkit';
import scheduleReducer from '../features/scheduleSlice';

export const store = configureStore({
  reducer: {
    schedule: scheduleReducer,
  },
});
