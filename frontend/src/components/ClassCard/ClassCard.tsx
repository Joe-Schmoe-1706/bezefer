import React, {useEffect, useState} from "react";
import * as S from "./ClassCard.style"
import { useTheme } from "../../Context/ThemeContext"
import StudentsModal from "../PopupList/PopupList";
import * as DeleteStyle from "../../Style/DeleteIcon.style"
import { Student } from "../../Types/types";
import { Props } from "./ClassCard.types";
import { getStudentsInClass } from "../../api/students.api";

const ClassCard : React.FC<Props> = ({classroom}) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);

    useEffect(() => {
        const changeStudentsInClass = async () => {
            const students = await getStudentsInClass(classroom._id);
            if (students === undefined) {
                setStudentsInClass([]);
            } else {
                setStudentsInClass(students)
            }
        }

        changeStudentsInClass();
    },[])

    const closeModal = () : void => {
        setIsOpen(false);
    }

    const openModal = () : void => {
        setIsOpen(true);
    }

    const deleteStudent = (id : string) : void => {
        console.log("student deleted with id " + id);
    }

    return (
        <div>
            <S.ClassCard>
                <S.ClassName>{classroom.name}</S.ClassName>
                <S.SeatsLeft>There are <strong>{classroom.numberOfSeatsLeft}</strong> seats left</S.SeatsLeft>
                <S.TotalSeats>out of <strong>{classroom.numberOfSeats}</strong></S.TotalSeats>
                <S.Footer>
                    <S.OpenStudentList onClick={openModal}>STUDENT LIST</S.OpenStudentList>
                    <S.DeleteClassButton>
                        <DeleteStyle.CustomDeleteIcon projectTheme={theme}></DeleteStyle.CustomDeleteIcon>
                    </S.DeleteClassButton>
                </S.Footer>
            </S.ClassCard>
            <StudentsModal
             isOpen={isOpen}
             closeModal={closeModal}
             items={studentsInClass}
             listType="students"
             handleClick={deleteStudent}></StudentsModal>
        </div>
    )
}

export default ClassCard;