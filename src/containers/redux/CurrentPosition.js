import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    latitude: 0,
    longitude: 0,
}

export default createSlice({
    name: 'currentPosition',
    initialState,
    reducers: {
        addCurrentPosition(state, action) {
            console.log('Added current position');
            state.latitude = action.payload.latitude;
            state.longitude = action.payload.longitude;
        },
        currentPositon(state, action) {
            return state;
        }
    },
})