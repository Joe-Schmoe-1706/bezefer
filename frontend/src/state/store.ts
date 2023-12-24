import { configureStore } from "@reduxjs/toolkit";
import classroomReducer from "./reducers/classroomSlice";

const store = configureStore({
    reducer: {
        classroom: classroomReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

