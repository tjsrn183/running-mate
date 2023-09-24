import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LocationType {
    start: { lat: number; lon: number };
    end: { lat: number; lon: number };
    ifCalRun?: boolean;
}
export interface runActionType {
    key: 'start' | 'end';
    value: { lat: number; lon: number };
}
const initialState: LocationType = {
    start: { lat: 0, lon: 0 },
    end: { lat: 0, lon: 0 },
    ifCalRun: false
};

const runSlice = createSlice({
    name: 'run',
    initialState,
    reducers: {
        startEndLocation: (state, action: PayloadAction<runActionType>) => {
            const { key, value } = action.payload;
            return {
                ...state,
                [key]: value
            };
        },
        initialize: () => initialState
    }
});

export const { startEndLocation, initialize } = runSlice.actions;
export default runSlice;
