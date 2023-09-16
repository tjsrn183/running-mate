import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authSlice';
import writeSlice from './writeSlice';
import { api } from '../api/queries';

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        write: writeSlice.reducer,
        [api.reducerPath]: api.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware)
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
