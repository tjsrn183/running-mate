import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
interface LocationType {
    start: { lat: number; lon: number };
    end: { lat: number; lon: number };
    currentMapState?: any;
}
export interface runActionType {
    key: 'start' | 'end' | 'cal' | 'map';
    value: { lat: number; lon: number } | { currentMapState: any };
}
const initialState: LocationType = {
    start: { lat: 0, lon: 0 },
    end: { lat: 0, lon: 0 },
    currentMapState: {}
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
        currentMap: (state, action: PayloadAction<any>) => {
            state.currentMapState = action.payload;
        },
        initialize: () => initialState
    }
});

export const { startEndLocation, initialize, currentMap } = runSlice.actions;
export default runSlice;
