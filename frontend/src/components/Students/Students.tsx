import {TableBody, TableHead, TableRow } from "@mui/material";
import React, {useEffect, useState} from "react"
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Students.style"
import PopupList from "../PopupList/PopupList"
import { Classroom, Student } from "../../Types/types";
import { getStudentsDTO, deleteStudent, addStudentToClass } from "../../api/students.api";
import Swal from "sweetalert2";
import { getAvailableClassrooms } from "../../api/classrooms.api";
import { tableHeaders } from "./Students.consts";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';


const Students : React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [availableClassrooms, setAvailableClassroom] = useState<Classroom[]>([]);
    const [students, setStudents] = useState<Student[]>([]);
    const [chosenStudentId, setChosenStudentId] = useState<string>('');

    useEffect(() => {
        const initializeStudents = async (): Promise<void> => {
            try {
                const allStudents = await getStudentsDTO();
                setStudents(allStudents);
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'error',
                    text: 'could not fetch students'
                })
            }
        }

        initializeStudents();
    }, [])

    useEffect(() => {
        const initializeAvialableClasses = async (): Promise<void> => {
            try {
                const classrooms = await getAvailableClassrooms();
                setAvailableClassroom(classrooms);
            } catch (error) {
                Swal.fire({
                    title: 'error',
                    text: 'could not fetch available classrooms',
                    icon: 'error'
                })
            }
        }

        initializeAvialableClasses();
    }, [])

    const openPopup = (studentId : string) : void => {
        setChosenStudentId(studentId);
        setIsPopupOpen(true);
    }

    const closePopup = () : void => {
        setIsPopupOpen(false);
    }

    const assignToClass = async (classroomId: string) : Promise<void> => {
        try {
            await addStudentToClass(chosenStudentId, classroomId);
            setStudents((prevStudents) => {
                return prevStudents.map((student) => {
                    return student._id === chosenStudentId ?
                    {
                        ...student,
                        classroom: classroomId
                    } :
                    student
                })
            })
            
            setAvailableClassroom((prevClassroom) => {
                return prevClassroom.map((classroom) => {
                    return classroom._id === classroomId ?
                    {
                        ...classroom,
                        numberOfSeatsLeft: classroom.numberOfSeatsLeft - 1
                    } :
                    classroom
                })
            })
            alertify.success("student successfully assigned to class")
        } catch (error: any) {
            if (error.response && error.response.data === 400) {
                Swal.fire({
                    title: 'full classroom',
                    text: 'classroom is already full',
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: 'error',
                    text: 'could not assign student to class',
                    icon: 'error'
                })
            }
        }

        closePopup();
    }

    const deleteSelectedStudent = async (studentId: string) => {
        Swal.fire({
            title: 'Are you sure you want to delete the student?',
            showCancelButton: true,
            confirmButtonText: "Delete"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteStudent(studentId);
                    setStudents((prevStudents) => {
                        return prevStudents.filter((student) => student._id !== studentId)
                    });
                    alertify.success("student successfully deleted");
                } catch (error) {
                    Swal.fire({
                        title: 'error',
                        text: 'could not delete student',
                        icon: 'error'
                    })
                }
            }
        })
    };

    const theme = useTheme();

    const renderedStudentValues = (student: Student) : JSX.Element[] => {
        const renderedValues = [];
        for (const key in student) {
            if (key !== "classroom") {
                renderedValues.push(<S.StyledTableCell>{student[key]}</S.StyledTableCell>)
            }
        }

        return renderedValues;
    } 

    const renderedRows : JSX.Element[] = students.map((student) => {
        return (
            <TableRow>
                {renderedStudentValues(student)}
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={() => openPopup(student._id)} disabled={student.classroom != ''}>ASSIGN TO CLASS</S.DynamicButton>
                </S.StyledTableCell>
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={() => deleteSelectedStudent(student._id)}>DELETE</S.DynamicButton>
                </S.StyledTableCell>
            </TableRow>
        )
    });

    const renderedHeaders : JSX.Element[] = tableHeaders.map((header) => {
        return <S.StyledTableCell>{header}</S.StyledTableCell>
    });

    const renderedAvilableClasses : Classroom[] = availableClassrooms.filter(classroom => classroom.numberOfSeatsLeft !== 0);

    return (
       <div>
        <S.StudentTableContainer>
            <S.StudentTable>
                <TableHead>
                    <TableRow>
                        {renderedHeaders}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {renderedRows}
                </TableBody>
            </S.StudentTable>
        </S.StudentTableContainer>
        <PopupList
            isOpen={isPopupOpen} 
            closeModal={closePopup}
            items={renderedAvilableClasses}
            listType="classes"
            handleClick={assignToClass}
            />
       </div>
    )
}

export default Students;