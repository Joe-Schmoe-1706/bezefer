import { Classroom } from "../Types/types";

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
