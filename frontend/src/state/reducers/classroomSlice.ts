import { createSlice } from "@reduxjs/toolkit";
import { Classroom, StatusOptions } from "../../Types/types";
import { AddAction, ChangeSeatsAction, DeleteAction, InitAction, StatusAction } from "../action.types";
import { RootState } from "../store";

export interface stateValue {
    classrooms: Classroom[],
    status: StatusOptions
};

const initialState: stateValue = {
    classrooms: [],
    status: "loading"
}

export const classroomSlice = createSlice({
    name: 'classroom',
    initialState,
    reducers: {
        addClass: (state: stateValue, action: AddAction) => {
            state.classrooms.push(action.payload.classroom);
            return state;
        },
        deleteClass: (state: stateValue, action: DeleteAction) => {
            const newClassrooms = state.classrooms.filter(classroom => classroom._id !== action.payload.id);
            state.classrooms = newClassrooms;
            return state;
        },
        changeSeatsLeft: (state: stateValue, action: ChangeSeatsAction) => {
            const updated = state.classrooms.map((classroom) => {
                return classroom._id === action.payload.id ?
                {
                    ...classroom,
                    seatsLeft: action.payload.type === "add" ? classroom.seatsLeft + 1 : classroom.seatsLeft - 1
                } :
                classroom
            });

            state.classrooms = updated;
            return state;
        },
        initializeState: (state: stateValue, action: InitAction) => {
            state.classrooms = action.payload.classrooms;
            return state;
        },
        changeStatus: (state: stateValue, action: StatusAction) => {
            state.status = action.payload.status;
            return state;
        }
    },

});

export const {
    addClass,
    deleteClass,
    changeSeatsLeft,
    initializeState,
    changeStatus
} = classroomSlice.actions;

export const selectClassroom = (state: RootState) => state.classroom.classrooms

export const selectAvailableClassrooms = (state: RootState) => {
    const classrooms = state.classroom.classrooms;

    return classrooms.filter(classroom => classroom.seatsLeft > 0);
}

export default classroomSlice.reducer;