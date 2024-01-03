import { createSlice } from "@reduxjs/toolkit";
import { StatusOptions, Student } from "../../Types/types";
import {StudentAdd, StudentDelete, ChangeClassroomStatus, SetStudentsAction, StatusAction} from "../action.types"
import { RootState } from "../store";

interface StateValue {
    students: Map<string, Student>
    status: StatusOptions
};

const initialState: StateValue = {
    students: new Map<string,Student>(),
    status: "loading"
};

export const studentSlice = createSlice({
    name: "students",
    initialState: initialState,
    reducers: {
        addStudnet (state: StateValue, action: StudentAdd) {
            state.students.set(action.payload.student._id, action.payload.student);
            return state;
        },
        deleteStudent (state: StateValue, action: StudentDelete) {
            state.students.delete(action.payload.studentId);
            return state;
        },
        changeStudentToClass(state: StateValue, action: ChangeClassroomStatus) {
            const student = state.students.get(action.payload.studentId);

            if (student) {
                student.classroom = action.payload.classroomId ? action.payload.classroomId : '';
            } else {
                console.error("student does not exist: " + action.payload.studentId);
            }
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
    deleteStudent,
    changeStudentToClass,
    setStudents
} = studentSlice.actions

export default studentSlice.reducer;