import { Classroom } from "../Types/types";
import axios from "axios";

    const api = axios.create({
        baseURL: `http://localhost:5000/classes`
    })

    export const getAllClassrooms = async (): Promise<Classroom[]> => {
        const result = await api.get('')
        const classrooms = await result.data;
        return classrooms;
    }

    export const deleteClassroom = async (classroomId: string): Promise<void> => {
        await api.delete(`/${classroomId}`)
    }

    export const addClassroom = async (classroom: Classroom): Promise<void> => {
        await api.post('', {
            classroom
        })
    }

    export const getAvailableClassrooms = async (): Promise<Classroom[]> => {
        const result = await api.get(`/available`);
        const classrooms = result.data;
        return classrooms;
    }
