import { Classroom } from "../Types/types";

const BASE_URL = "http://localhost:5000"

    export const getAllClassrooms = async (): Promise<Classroom[]> => {
        const result = await fetch(`${BASE_URL}/classes`,{
            method: "GET"
        });
        const classrooms = await result.json();
        return classrooms;
    }

    export const deleteClassroom = async (classroomId: string): Promise<void> => {
        await fetch (`${BASE_URL}/classes/${classroomId}`, {
            method: "DELETE"
        });
    }

    export const addClassroom = async (classroomId: string, name: string, numberOfSeats: number): Promise<void> => {
        await fetch(`${BASE_URL}/classes`, {
            method: "POST",
            body: JSON.stringify({
                _id: classroomId,
                name: name,
                numberOfSeats: numberOfSeats
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    export const getAvailableClassrooms = async (): Promise<Classroom[]> => {
        const result = await fetch(`${BASE_URL}/classes/available`);
        const classrooms = result.json();
        return classrooms;
    }
