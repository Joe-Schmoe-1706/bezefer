import { Classroom } from "../../Types/types"

export interface Props {
    classroom: Classroom,
    deleteClass: (id: string) => void,
    updateClassSeats: (id: string, newNumSeats: number) => void
}