import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WriteState {
    title: string;
    body: string;
    postId?: number | null;
}

export interface ChangeFieldWritePayload {
    key: 'title' | 'body';
    value: string;
}
const initialState: WriteState = {
    title: '',
    body: '',
    postId: null
};

const writeSlice = createSlice({
    name: 'write',
    initialState,
    reducers: {
        changeWriteField: (state: WriteState, action: PayloadAction<ChangeFieldWritePayload>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        setPost: (state: WriteState, action: PayloadAction<WriteState>) => {
            state.title = action.payload.title;
            state.body = action.payload.body;
            state.postId = action.payload.postId;
        },

        initialize: () => initialState
    }
});

export const { changeWriteField, initialize, setPost } = writeSlice.actions;
export default writeSlice;
