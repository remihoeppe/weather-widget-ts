import { configureStore } from "@reduxjs/toolkit";
import windChangeReducer from "./windChange";
import tempChangeReducer from "./tempChange";
import titleChangeReducer from "./titleChange";

export default configureStore({
    reducer: {
        tempChange: tempChangeReducer,
        windChange: windChangeReducer,
        titleTextChange: titleChangeReducer,
    },
});
