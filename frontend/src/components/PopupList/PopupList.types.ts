import { Classroom, Student } from "../../Types/types";

export interface StudentsModalProps {
    isOpen : boolean,
    closeModal : () => void,
    items : (Classroom[] | Student[]),
    handleClick: (id : string) => void,
    listType : 'students' | 'classes'
}