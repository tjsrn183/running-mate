import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WriteState {
    title: string;
    body: string;
    [state: string]: any;
}

export interface ChangeFieldWritePayload {
    key: 'title' | 'body';
    value: string;
}
const initialState: WriteState = {
    title: '',
    body: ''
};

const writeSlice = createSlice({
    name: 'write',
    initialState,
    reducers: {
        changeWriteField: (state: WriteState, action: PayloadAction<ChangeFieldWritePayload>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        initiallize: () => initialState
    }
});

export const { changeWriteField, initiallize } = writeSlice.actions;
export default writeSlice;
