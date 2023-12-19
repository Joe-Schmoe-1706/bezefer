import { Student } from "../Types/types";

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

export const addStudents = async(
    studentId: string,
    firstName: string,
    lastName: string,
    age: number,
    profession: string): Promise<void> => {
        try {
            await fetch(`${BASE_URL}/students`,{
                method: "POST",
                body: JSON.stringify({
                    _id: studentId,
                    firstName: firstName,
                    lastName: lastName,
                    age: age,
                    profession: profession
                }),
                headers: {
                    "Content-Type": "application/json"
                }
            })
        } catch (error) {
            throw (error);
        }
    } 

export const getStudentsInClass = async (classroomId: string): Promise<Student[]> => {
    const result = await fetch(`${BASE_URL}/students/classroom/${classroomId}`);
    return await result.json();
}

export const addStudentToClass = async (studentId: string, classroomId: string): Promise<void> => {
    await fetch(`${BASE_URL}/students/${studentId}/classroom/${classroomId}/add`, {
        method: "PATCH"
    });
}

export const removeStudentFromClass = async (studentId: string, classroomId: string): Promise<void> => {
    await fetch(`${BASE_URL}/students/${studentId}/classroom/${classroomId}/remove`, {
        method: "PATCH"
    });
}