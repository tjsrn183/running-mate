import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WriteState {
  title: string;
  body: string;
  [state: string]: any;
}

interface ChangeFieldPayload {
  key: string;
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
    changeWriteField: (
      state: WriteState,
      action: PayloadAction<ChangeFieldPayload>
    ) => {
      const { key, value } = action.payload;
      state[key] = value;
    }
  }
});

export const { changeWriteField } = writeSlice.actions;
export default writeSlice;
