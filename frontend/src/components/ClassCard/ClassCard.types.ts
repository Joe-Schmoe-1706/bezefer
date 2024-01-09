import { Classroom } from "../../Types/types"

export interface ClassCardProps {
    classroom: Classroom,
    deleteClass: (classroom: Classroom) => void,
}