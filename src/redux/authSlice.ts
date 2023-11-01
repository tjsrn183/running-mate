import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthFormKey = 'user_id' | 'password' | 'name';

interface AuthState {
    register: {
        [key in AuthFormKey]: string;
    };
    login: {
        user_id: string;
        password: string;
    };
}

interface ChangeFieldAuthPayload {
    form: 'register' | 'login';
    key: AuthFormKey;
    value: string;
}

const initialState: AuthState = {
    register: {
        user_id: '',
        password: '',
        name: ''
    },
    login: {
        user_id: '',
        password: ''
    }
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        changeAuthField: (state: AuthState, action: PayloadAction<ChangeFieldAuthPayload>) => {
            const { form, key, value } = action.payload;
            return {
                ...state,
                [form]: {
                    ...state[form],
                    [key]: value
                }
            };
        },
        initializeForm: (state: AuthState, action: PayloadAction<keyof AuthState>) => {
            const form = action.payload;
            return {
                ...state,
                [form]: initialState[form]
            };
        }
    }
});

export const { changeAuthField, initializeForm } = authSlice.actions;
export default authSlice;
