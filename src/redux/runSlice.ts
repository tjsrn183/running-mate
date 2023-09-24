import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LocationType {
    lat: number;
    lon: number;
}
interface runActionType {
    key: 'lat' | 'lon';
    value: number;
}
const initialState: LocationType = {
    lat: 0,
    lon: 0
};

const runSlice = createSlice({
    name: 'run',
    initialState,
    reducers: {
        startEndLocation: (state, action: PayloadAction<runActionType>) => {
            const { key, value } = action.payload;
            state[key] = value;
        },
        initialize: () => initialState
    }
});

export const { startEndLocation, initialize } = runSlice.actions;
export default runSlice;
