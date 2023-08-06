import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type AuthFormKey = 'id' | 'password' | 'name' | 'phoneNumber' | 'nickname' | 'birthday' | 'sex';

interface AuthState {
    register: {
        [key in AuthFormKey]: string;
    };
    login: {
        id: string;
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
        id: '',
        password: '',
        name: '',
        phoneNumber: '',
        nickname: '',
        birthday: '',
        sex: ''
    },
    login: {
        id: '',
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
