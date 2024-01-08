import { createSlice } from "@reduxjs/toolkit";
import { StatusOptions, Student } from "../../Types/types";
import {StudentAdd, StudentDelete, ChangeClassroomStatus, SetStudentsAction, StatusAction} from "../action.types"
import { RootState } from "../store";
import { Dispatch } from "react";
import { addStudents, getAllStudents, deleteStudent, removeStudentFromClass, addStudentToClass } from "../../api/students.api";
import { changeSeatsLeft } from "./classroomSlice";
import { enableMapSet } from "immer";
import { useAppSelector } from "../../hooks";

enableMapSet()

interface StateValue {
    students: Map<string, Student>
    status: StatusOptions
};

const initialState: StateValue = {
    students: new Map<string,Student>(),
    status: "loading"
};

export const fetchStudents = () => async (dispatch: Dispatch) => {
    try {
        const students = await getAllStudents();
        const mappedStudents = new Map(Object.entries(students).map(([key, value]) => [value._id, value]));
        dispatch(setStudents({students: mappedStudents}));
        dispatch(changeStatus({
            status: "done"
        }));
    } catch (error) {
        dispatch(changeStatus({
            status: "failed"
        }))
        throw error;
    }
};

export const addStudentHandler = (studentToAdd: Student) => async (dispatch: Dispatch) => {
    try {
        await addStudents(studentToAdd);
        dispatch(addStudnet({
            student: studentToAdd
        }));
    } catch (error) {
        throw error;
    }
};

export const deleteStudentHandler = (student: Student) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        await deleteStudent(student._id);

        if (student.classroom !== "") {
            dispatch(changeSeatsLeft({
                id: student._id,
                type: "add"
            }))
        }

        dispatch(deleteStudentState({
            studentId: student._id
        }));

    } catch (error) {
        throw error;
    }
}

export const removeFromClassHandler = (studentId: string, prevClassroomId: string) => async (dispatch: Dispatch) => {
    try {
        await removeStudentFromClass(studentId, prevClassroomId);
        dispatch(changeStudentToClass({
            studentId: studentId
        }));
        dispatch(changeSeatsLeft({
            id: prevClassroomId,
            type: "add"
        }));
    } catch (error) {
        console.log(error);
        throw error;
    }
}

export const addToClassHandler = (studentId: string, newClassroomId: string) => async (dispatch: Dispatch) => {
    try {
        await addStudentToClass(studentId, newClassroomId);
        dispatch(changeStudentToClass({
            studentId: studentId,
            classroomId: newClassroomId
        }));
        dispatch(changeSeatsLeft({
            id: newClassroomId,
            type: "remove"
        }));
    } catch (error) {
        throw error;
    }
};

export const studentSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: {
        addStudnet (state: StateValue, action: StudentAdd) {
            state.students.set(action.payload.student._id, action.payload.student);
            return state;
        },
        deleteStudentState (state: StateValue, action: StudentDelete) {
            state.students.delete(action.payload.studentId);
            return state;
        },
        changeStudentToClass(state: StateValue, action: ChangeClassroomStatus) {
            const student = state.students.get(action.payload.studentId);

            if (student) {
                student.classroom = action.payload.classroomId ? action.payload.classroomId : '';
            }
            
            return state;
        },
        setStudents(state: StateValue, action: SetStudentsAction) {
            state.students = action.payload.students;
            return state;
        },
        changeStatus(state: StateValue, action: StatusAction) {
            state.status = action.payload.status;
        }
    }
});

export const selectStudents = (state: RootState) => state.student.students;

export const selectStudentsInClass = (state: RootState, classroomId: string) => {
    let newMap: Map<string, Student> = new Map<string, Student>();
    
    for (let student of state.student.students.values()) {
        if (student.classroom === classroomId) {
            newMap.set(student._id, student);
        }
    }  

    return newMap;
}

export const  {
    addStudnet,
    deleteStudentState,
    changeStudentToClass,
    setStudents,
    changeStatus
} = studentSlice.actions

export default studentSlice.reducer;