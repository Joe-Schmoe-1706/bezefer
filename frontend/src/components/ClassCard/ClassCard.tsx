import React, {useEffect, useState} from "react";
import * as S from "./ClassCard.style"
import { useTheme } from "../../Context/ThemeContext"
import StudentsModal from "../PopupList/PopupList";
import * as DeleteStyle from "../../Style/DeleteIcon.style"
import { Student } from "../../Types/types";
import { getStudentsInClass, removeStudentFromClass } from "../../api/students.api";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch } from "../../hooks";
import { increaseSeatsLeft } from "../../state/reducers/classroomSlice";
import { ClassCardProps } from "./ClassCard.types";


const ClassCard : React.FC<ClassCardProps> = ({classroom, deleteClass}) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);

    const dispatch = useAppDispatch();

    useEffect(() => {
        const changeStudentsInClass = async () => {
            try {
                const students = await getStudentsInClass(classroom._id);
                setStudentsInClass(students)
            } catch (error) {
                Swal.fire({
                    title: 'תקלה',
                    text: 'לא ניתן לטעון את התלמידים בכיתה זו',
                    icon: 'error'
                });
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

    const deleteStudent = async (id : string) : Promise<void> => {
        try {
            closeModal();
            await removeStudentFromClass(id, classroom._id);
            setStudentsInClass((prevStudents) => {
                return prevStudents.filter((student) => student._id != id)
            });
            dispatch(increaseSeatsLeft({
                id: classroom._id,
                change: 1
            }));
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