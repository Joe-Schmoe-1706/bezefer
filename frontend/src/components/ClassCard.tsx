import React, {useState} from "react";
import * as S from "../Style/ClassCard.style"
import { useTheme } from "../Context/ThemeContext"
import StudentsModal from "./PopupList";
import * as DeleteStyle from "../Style/DeleteIcon.style"

const ClassCard : React.FC = () => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () : void => {
        setIsOpen(false);
    }

    const openModal = () : void => {
        setIsOpen(true);
    }

    const classInSchool = {
        subject : "physics",
        teacher : "karlo",
        capacity : 45,
        seatsLeft : 22,
        students : [
            {
                id : 1,
                name : "מתן גולדברג"
            },
            {
                id : 2,
                name : "פיונה פנג"
            }
        ]
    };

    const deleteStudent = (id : number) : void => {
        console.log("student deleted with id " + id);
    }

    return (
        <div>
            <S.ClassCard>
                <S.ClassName>אלון</S.ClassName>
                <S.SeatsLeft>There are <strong>2</strong> seats left</S.SeatsLeft>
                <S.TotalSeats>out of <strong>2</strong></S.TotalSeats>
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
             items={classInSchool.students}
             listType="classes"
             handleClick={deleteStudent}></StudentsModal>
        </div>
    )
}

export default ClassCard;