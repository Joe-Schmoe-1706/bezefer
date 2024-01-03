import { Classroom } from "../../Types/types"

export interface ClassCardProps {
    classroom: Classroom,
    deleteClass: (id: string) => void,
}