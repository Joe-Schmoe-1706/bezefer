import { Classroom } from "../Types/types";

const BASE_URL = "http://localhost:5000/"

export default class ClassroomAPI {
    async getAllClassrooms(): Promise<Classroom[]> {
        const result = await fetch(`${BASE_URL}/classes`);
        const classrooms = await result.json();
        return classrooms;
    }

    async deleteClassroom(classroomId: string): Promise<void> {
        await fetch (`${BASE_URL}/classes/${classroomId}`, {
            method: "DELETE"
        });
    }

    async addClassroom(classroomId: string, name: string, numberOfSeats: number): Promise<void> {
        await fetch(`${BASE_URL}/classes`, {
            method: "POST",
            body: JSON.stringify({
                _id: classroomId,
                name: name,
                numberOfSeats: numberOfSeats
            })
        });
    }

    async getAvailableClassrooms(): Promise<Classroom[]> {
        const result = await fetch(`${BASE_URL}/classes/available`);
        const classrooms = result.json();
        return classrooms;
    }
}