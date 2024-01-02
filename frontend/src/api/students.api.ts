import { Student } from "../Types/types";
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/students`
})

export const getAllStudents = async (): Promise<Student[]> => {
    try {
        const result = await api.get(`/students`)
        return await result.data;
    } catch(error) {
        throw error;
    }
}

export const getStudentsDTO = async (): Promise<Student[]> => {
    try {
        const result = await api.get(`/students/DTO`);
        return await result.data;
    } catch(error) {
        throw error;
    }
}

export const deleteStudent = async (studentId: string): Promise<void> => {
    try {
        await api.delete(`/students/${studentId}`)
    } catch(error) {
        throw error;
    }
}

export const addStudents = async(student: Student): Promise<void> => {
    try {
        await api.post("/students",{
            student
        });
    } catch(error) {
        throw error;
    }
}

export const getStudentsInClass = async (classroomId: string): Promise<Student[]> => {
    try {
        const result = await api.get(`/students/classroom/${classroomId}`);
        return await result.data;
    } catch(error) {
        throw error;
    }
}

export const addStudentToClass = async (studentId: string, classroomId: string): Promise<void> => {
    try {
        await api.patch(`/students/${studentId}/classroom/${classroomId}/add`)
    } catch (error: any) {
        throw error;
    }
}

export const removeStudentFromClass = async (studentId: string, classroomId: string): Promise<void> => {
    try {
        await api.patch(`/students/${studentId}/classroom/${classroomId}/remove`)
    } catch (error: any) {
        throw error;
    }
}