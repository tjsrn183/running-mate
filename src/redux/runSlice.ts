import { createSlice, current, PayloadAction } from '@reduxjs/toolkit';
export interface runActionType {
    key: 'start' | 'end' | 'map';
    value: { lat: number; lon: number } | { currentMapState: any };
}

export interface runNaturalLanType {
    key: 'startLocationNaturalLan' | 'endLocationNaturalLan';
    value: string;
}
export interface subInfoType {
    key: 'title' | 'body' | 'numberOfPeople' | 'date';
    value: string | number;
}
export interface LocationType {
    start: { lat: number; lon: number };
    startLocationNaturalLan: string;
    end: { lat: number; lon: number };
    endLocationNaturalLan: string;
    currentMapState?: any;
    durationTime: number;
    distance: number;
    title?: string;
    body: string;
    numberOfPeople?: number;
    date: string;
    name?: string;
    createdAt?: string;
    runItemId?: number;
    roomId?: number;
    ChatRoom?: { roomId: number };
    UserId?: number;
    thumbnail?: string;
}
const dateNow = new Date(new Date().getTime() + 9 * 60 * 60 * 1000).toISOString().slice(0, 16);
const initialState: LocationType = {
    start: { lat: 0, lon: 0 },
    startLocationNaturalLan: '',
    end: { lat: 0, lon: 0 },
    endLocationNaturalLan: '',
    currentMapState: {},
    durationTime: 0,
    distance: 0,
    title: '',
    body: '',
    numberOfPeople: 1,
    date: dateNow,
    name: ''
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
        runInfo: (state, action: PayloadAction<number[]>) => {
            state.distance = action.payload[0];
            state.durationTime = action.payload[1];
        },
        subInfo: (state, action: PayloadAction<subInfoType>) => {
            const { key, value } = action.payload;
            return {
                ...state,
                [key]: value
            };
        },
        initialize: () => initialState
    }
});

export const { startEndLocation, initialize, currentMap, locationNaturalLan, runInfo, subInfo } = runSlice.actions;
export default runSlice;
