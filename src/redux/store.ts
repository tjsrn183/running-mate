import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import writeSlice from './writeSlice';

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    write: writeSlice.reducer
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
