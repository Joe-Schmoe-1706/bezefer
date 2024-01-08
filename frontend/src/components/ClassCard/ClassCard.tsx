import React, {useEffect, useState} from "react";
import * as S from "./ClassCard.style"
import { useTheme } from "../../Context/ThemeContext"
import StudentsModal from "../PopupList/PopupList";
import * as DeleteStyle from "../../Style/DeleteIcon.style"
import { Student } from "../../Types/types";
import { getStudentsInClass } from "../../api/students.api";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { ClassCardProps } from "./ClassCard.types";
import { removeFromClassHandler, selectStudentsInClass } from "../../state/reducers/studentSlice";


const ClassCard : React.FC<ClassCardProps> = ({classroom, deleteClass}) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);

    const dispatch = useAppDispatch();

    const studentsInClass = useAppSelector((state) => selectStudentsInClass(state, classroom._id));

    const closeModal = () : void => {
        setIsOpen(false);
    }

    const openModal = () : void => {
        setIsOpen(true);
    }

    const deleteStudent = async (id : string) : Promise<void> => {
        try {
            closeModal();
            // await removeStudentFromClass(id, classroom._id);
            // setStudentsInClass((prevStudents) => {
            //     return prevStudents.filter((student) => student._id != id)
            // });
            // dispatch(increaseSeatsLeft({
            //     id: classroom._id,
            //     change: 1
            // }));

            await dispatch(removeFromClassHandler(id, classroom._id));
            alertify.success("התלמיד הוסר מהכיתה בהצלחה");
        } catch (error) {
            Swal.fire({
                title: 'תקלה',
                text: 'לא ניתן להסיר תלמידים מהכיתה',
                icon: 'error'
            })
        }
    }

    return (
        <div>
            <S.ClassCard>
                <S.ClassName>{classroom.name}</S.ClassName>
                <S.SeatsLeft>There are <strong>{classroom.seatsLeft}</strong> seats left</S.SeatsLeft>
                <S.TotalSeats>out of <strong>{classroom.capacity}</strong></S.TotalSeats>
                <S.Footer>
                    <S.OpenStudentList onClick={openModal}>STUDENT LIST</S.OpenStudentList>
                    <S.DeleteClassButton onClick={() => deleteClass(classroom._id)}>
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