import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface WindState {
    value: boolean;
}

// Define the initial state using that type
const initialState: WindState = {
    value: true,
};

const windChangeSlice = createSlice({
    name: "wind",
    initialState,
    reducers: {
        switchWindDisplay: (state, action: PayloadAction<boolean>) => {
            state.value = action.payload;
        },
    },
});

export const { switchWindDisplay } = windChangeSlice.actions;

export default windChangeSlice.reducer;
