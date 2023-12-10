import React, {useState} from "react";
import * as S from "./ClassCard.style"
import { useTheme } from "../Context/ThemeContext"
import StudentsModal from "./StudentsModal";
import * as DeleteStyle from "./DeleteIcon.style"

const ClassCard : React.FC = () => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const closeModal = () : void => {
        setIsOpen(false);
    }

    const openModal = () : void => {
        setIsOpen(true);
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
            <StudentsModal isOpen={isOpen} closeModal={closeModal}></StudentsModal>
        </div>
    )
}

export default ClassCard;