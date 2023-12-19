import React, {useEffect, useState} from "react";
import * as S from "./ClassCard.style"
import { useTheme } from "../../Context/ThemeContext"
import StudentsModal from "../PopupList/PopupList";
import * as DeleteStyle from "../../Style/DeleteIcon.style"
import { Student } from "../../Types/types";
import { Props } from "./ClassCard.types";
import { getStudentsInClass, removeStudentFromClass } from "../../api/students.api";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';


const ClassCard : React.FC<Props> = ({classroom, deleteClass}) => {
    const theme = useTheme();

    const [isOpen, setIsOpen] = useState(false);
    const [studentsInClass, setStudentsInClass] = useState<Student[]>([]);

    useEffect(() => {
        const changeStudentsInClass = async () => {
            try {
                const students = await getStudentsInClass(classroom._id);
                setStudentsInClass(students)
            } catch (error) {
                Swal.fire({
                    title: 'error',
                    text: 'could not load students in class',
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
            await removeStudentFromClass(id, classroom._id);
            setStudentsInClass((prevStudents) => {
                return prevStudents.filter((student) => student._id != id)
            });
            classroom.numberOfSeatsLeft = classroom.numberOfSeatsLeft + 1;
            alertify.success("student successfully removed from class");
        } catch (error) {
            Swal.fire({
                title: 'error',
                text: 'could not remove student from class',

            })
        }
    }

    return (
        <div>
            <S.ClassCard>
                <S.ClassName>{classroom.name}</S.ClassName>
                <S.SeatsLeft>There are <strong>{classroom.numberOfSeatsLeft}</strong> seats left</S.SeatsLeft>
                <S.TotalSeats>out of <strong>{classroom.numberOfSeats}</strong></S.TotalSeats>
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