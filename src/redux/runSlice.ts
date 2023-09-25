import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
interface LocationType {
    start: { lat: number; lon: number };
    startLocationNaturalLan: string;
    end: { lat: number; lon: number };
    endLocationNaturalLan: string;
    currentMapState?: any;
}
export interface runActionType {
    key: 'start' | 'end' | 'map';
    value: { lat: number; lon: number } | { currentMapState: any };
}

export interface runNaturalLanType {
    key: 'startLocationNaturalLan' | 'endLocationNaturalLan';
    value: string;
}

const initialState: LocationType = {
    start: { lat: 0, lon: 0 },
    startLocationNaturalLan: '',
    end: { lat: 0, lon: 0 },
    endLocationNaturalLan: '',
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
        locationNaturalLan: (state, action: PayloadAction<runNaturalLanType>) => {
            const { key, value } = action.payload;
            return {
                ...state,
                [key]: value
            };
        },
        initialize: () => initialState
    }
});

export const { startEndLocation, initialize, currentMap, locationNaturalLan } = runSlice.actions;
export default runSlice;
