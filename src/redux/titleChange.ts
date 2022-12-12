import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface TitleTextState {
    value: string;
}

// Define the initial state using that type
const initialState: TitleTextState = {
    value: "Widget Title",
};

const titleTextChangeSlice = createSlice({
    name: "titleText",
    initialState: initialState,
    reducers: {
        changeTitleText: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        },
    },
});

export const { changeTitleText } = titleTextChangeSlice.actions;
export default titleTextChangeSlice.reducer;
