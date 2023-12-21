import { Classroom } from "../Types/types";
import api from "./axiostInstance"

    export const getAllClassrooms = async (): Promise<Classroom[]> => {
        const result = await api.get("/classes")
        const classrooms = await result.data;
        return classrooms;
    }

    export const deleteClassroom = async (classroomId: string): Promise<void> => {
        await api.delete(`/classes/${classroomId}`)
    }

    export const addClassroom = async (classroom: Classroom): Promise<void> => {
        await api.post('/classes', {
            classroom
        })
    }

    export const getAvailableClassrooms = async (): Promise<Classroom[]> => {
        const result = await api.get(`/classes/available`);
        const classrooms = result.data;
        return classrooms;
    }
