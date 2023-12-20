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
        try {
            await api.post("/students",{
                student
            });
        } catch (error : any) {
            console.log("error 3 - frontend");
            throw new Error(error);
        }
    } 

export const getStudentsInClass = async (classroomId: string): Promise<Student[]> => {
    const result = await api.get(`/students/classroom/${classroomId}`);
    return await result.data;
}

export const addStudentToClass = async (studentId: string, classroomId: string): Promise<void> => {
    await api.patch(`/students/${studentId}/classroom/${classroomId}/add`)
}

export const removeStudentFromClass = async (studentId: string, classroomId: string): Promise<void> => {
    await api.patch(`/students/${studentId}/classroom/${classroomId}/remove`)
}