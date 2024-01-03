import { configureStore } from "@reduxjs/toolkit";
import classroomReducer from "./reducers/classroomSlice";
import studentReducer from "./reducers/studentSlice"

const store = configureStore({
    reducer: {
        classroom: classroomReducer,
        student: studentReducer
    }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;

