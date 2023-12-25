import { Student } from "../Types/types";
import api from "./axiostInstance"

const BASE_URL = "http://localhost:5000"


export const getAllStudents = async (): Promise<Student[]> => {
    const result = await fetch(`${BASE_URL}/students`)
    return await result.json();
}

export const getStudentsDTO = async (): Promise<Student[]> => {
    const result = await fetch(`${BASE_URL}/students/DTO`);
    return await result.json();
}

export const deleteStudent = async (studentId: string): Promise<void> => {
    await fetch (`${BASE_URL}/students/${studentId}`,{
        method: "DELETE"
    });
}

export const addStudents = async(student: Student): Promise<void> => {
    await api.post("/students",{
        student
    });
}

export const getStudentsInClass = async (classroomId: string): Promise<Student[]> => {
    const result = await api.get(`/students/classroom/${classroomId}`);
    return await result.data;
}

export const addStudentToClass = async (studentId: string, classroomId: string): Promise<void> => {
    try {
        await api.patch(`/students/${studentId}/classroom/${classroomId}/add`)
        console.log("api called");
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}

export const removeStudentFromClass = async (studentId: string, classroomId: string): Promise<void> => {
    try {
        await api.patch(`/students/${studentId}/classroom/${classroomId}/remove`)
        console.log("api called");
    } catch (error: any) {
        console.log(error.message);
        throw error;
    }
}