import { Student } from "../Types/types";
import axios from "axios";

const api = axios.create({
    baseURL: `http://localhost:5000/students`
})

export const getAllStudents = async () => {
    try {
        const { data } = await api.get<Student[]>(``)
        return data;
    } catch(error) {
        throw error;
    }
}

export const deleteStudent = async (student: Student): Promise<void> => {
    try {
        await api.delete(``,
        {
            data: student
        })
    } catch(error) {
        throw error;
    }
}

export const addStudents = async(student: Student): Promise<void> => {
    try {
        await api.post("",{
            student
        });
    } catch(error) {
        throw error;
    }
}

export const getStudentsInClass = async (classroomId: string) => {
    try {
        const {data} = await api.get<Student[]>(`/classroom`, {
            data: classroomId
        });
        return data;
    } catch(error) {
        throw error;
    }
}

export const addStudentToClass = async (studentId: string, classroomId: string): Promise<void> => {
    try {
        await api.patch(`/classroom/add`, {
            studentId: studentId,
            classroomId: classroomId
        })
    } catch (error: any) {
        throw error;
    }
}

export const removeStudentFromClass = async (studentId: string): Promise<void> => {
    try {
        await api.patch(`/classroom/remove`, {
            studentId: studentId
        })
    } catch (error: any) {
        throw error;
    }
}