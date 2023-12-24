import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { Classroom } from "../../Types/types";
import { AddAction, ChangeSeatsAction, DeleteAction, InitAction } from "../action.types";
import { getAllClassrooms } from "../../api/classrooms.api";
import { RootState } from "../store";
import { avatarClasses } from "@mui/material";

export interface stateValue {
    classrooms: Classroom[]
};

const initialState: stateValue = {
    classrooms: []
}

export const classroomSlice = createSlice({
    name: 'classroom',
    initialState,
    reducers: {
        addClassroom: (state: stateValue, action: AddAction) => {
            state.classrooms.push(action.payload.classroom);
            return state;
        },
        deleteClass: (state: stateValue, action: DeleteAction) => {
            const newClassrooms = state.classrooms.filter(classroom => classroom._id !== action.payload.id);
            return {
                classrooms: newClassrooms
            };
        },
        addStudentToClass: (state: stateValue, action: ChangeSeatsAction) => {
            const updated = state.classrooms.map((classroom) => {
                return classroom._id === action.payload.id ?
                {
                    ...classroom,
                    numberOfSeatsLeft: classroom.numberOfSeatsLeft - 1
                } :
                classroom
            });

            return {
                classrooms: updated
            }
        },
        removeStudentFromClass: (state: stateValue, action: ChangeSeatsAction) => {
            const updated = state.classrooms.map((classroom) => {
                return classroom._id === action.payload.id ?
                {
                    ...classroom,
                    numberOfSeatsLeft: classroom.numberOfSeatsLeft + 1
                } :
                classroom
            });

            return {
                classrooms: updated
            }
        },
        initializeState: (state: stateValue, action: InitAction) => {
            return {
                classrooms: action.payload.classrooms
            }
        }
    },

});

export const {
    addClassroom,
    deleteClass,
    addStudentToClass,
    removeStudentFromClass,
    initializeState
} = classroomSlice.actions;

export const selectClassroom = (state: RootState) => state.classroom.classrooms

export default classroomSlice.reducer;