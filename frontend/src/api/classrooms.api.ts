import { Classroom } from "../Types/types";
import axios from "axios";

    const api = axios.create({
        baseURL: `http://localhost:5000/classes`
    })

    export const getAllClassrooms = async (): Promise<Classroom[]> => {
        try {
            const result = await api.get('')
            const classrooms = await result.data;
            return classrooms;
        } catch(error) {
            throw error;
        }
    }

    export const deleteClassroom = async (classroomId: string): Promise<void> => {
        try {
            await api.delete(`/${classroomId}`)
        } catch (error) {
            throw error;
        }
    }

    export const addClassroom = async (classroom: Classroom): Promise<void> => {
        try {
            await api.post('', {
                classroom
            })
        } catch (error) {
            throw error
        }
    }
