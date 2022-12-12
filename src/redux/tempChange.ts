import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TempState {
    value: string;
}

// Define the initial state using that type
const initialState: TempState = {
    value: "C",
};

const tempChangeSlice = createSlice({
    name: "temp",
    initialState,
    reducers: {
        changeTemp: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

console.log(tempChangeSlice.getInitialState().value);

export const { changeTemp } = tempChangeSlice.actions;

export default tempChangeSlice.reducer;
