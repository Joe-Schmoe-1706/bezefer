import { ReactNode } from "react";
import { Classroom, Student } from "../../Types/types";

export interface StudentsModalProps {
    isOpen : boolean,
    closeModal : () => void,
    items : {
        text: string,
        _id: string
    }[],
    handleClick: (id : string) => void,
    header: string,
    avatar: ReactNode,
    actionIcon: ReactNode,
    errorMessage: string
}