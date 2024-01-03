import { Classroom, Student } from "../Types/types";

export interface AddAction {
    payload: {
        classroom: Classroom
    } 
};

export interface ChangeSeatsAction {
    payload: {
        id: string,
        change: number
    }
};

export interface DeleteAction {
    payload: {
        id: string
    }
};

export interface InitAction {
    payload: {
        classrooms: Classroom[];
    }
}

export interface StudentAdd {
    payload: {
        student: Student
    }
};

export interface StudentDelete { 
    payload: {
        studentId: string
    }
}

export interface ChangeClassroomStatus {
    payload: {
        studentId: string,
        classroomId?: string
    }
};

export interface SetStudentsAction {
    payload: {
        students: Map<string, Student>
    }
}
