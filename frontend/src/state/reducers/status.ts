import { RootState } from "../store";

export const selectStatus = (state: RootState) => {
    const studentStatus = state.student.status;
    const classroomStatus = state.classroom.status;

    if (studentStatus === "failed" || classroomStatus === "failed") {
        return "failed"
    } else if (studentStatus === "loading" || classroomStatus === "loading") {
        return "loading"
    } else {
        return "done"
    }
};