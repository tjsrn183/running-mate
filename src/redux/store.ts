import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import writeSlice from './writeSlice';
import runSlice from './runSlice';
import { api } from '../api/queries';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        write: writeSlice.reducer,
        run: runSlice.reducer,

        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false // Disable serializableCheck
        }).concat(api.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
