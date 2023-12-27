import {TableBody, TableHead, TableRow } from "@mui/material";
import React, {useEffect, useState} from "react"
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Students.style"
import PopupList from "../PopupList/PopupList"
import { Classroom, StatusOptions, Student } from "../../Types/types";
import { getStudentsDTO, deleteStudent, addStudentToClass } from "../../api/students.api";
import Swal from "sweetalert2";
import { tableHeaders } from "./Students.consts";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { decreaseSeatsLeft, increaseSeatsLeft, selectAvailableClassrooms } from "../../state/reducers/classroomSlice";
import ErrorPage from "../ErrorPage/ErrorPage";
import { Loading, LoadingContainer } from "../Classes/Classes.style";
import NoConnection from "../NoConnection/NoConnection";


const Students : React.FC<{
    status: StatusOptions
}> = ({ status }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [students, setStudents] = useState<Student[]>([]);
    const [chosenStudentId, setChosenStudentId] = useState<string>('');
    const [studentsStatus, setStudentStatus] = useState<StatusOptions>("loading");

    const availabeClassrooms = useAppSelector(selectAvailableClassrooms);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const initializeStudents = async (): Promise<void> => {
            try {
                const allStudents = await getStudentsDTO();
                setStudents(allStudents);
                setStudentStatus("done");
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'תקלה',
                    text: 'לא ניתן לקבל את התלמידים'
                })
                setStudentStatus("failed");
            }
        }

        initializeStudents();
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
            });

            dispatch(decreaseSeatsLeft({
                id: classroomId,
                change: 1
            }));

            alertify.success("התלמיד השתבץ לכיתה בהצלחה")
        } catch (error: any) {

            if (error.response && error.response.data === 400) {
                Swal.fire({
                    title: 'כיתה מלאה',
                    text: 'הכיתה כבר מלאה',
                    icon: 'error'
                })
            } else {
                Swal.fire({
                    title: 'תקלה',
                    text: 'לא ניתן לשייך את התלמיד לכיתה',
                    icon: 'error'
                })
            }
        }

        closePopup();
    }

    const deleteSelectedStudent = async (studentId: string) => {
        Swal.fire({
            title: 'האם אתה בטוח?',
            showCancelButton: true,
            confirmButtonText: "מחק",
            cancelButtonText: "בטל"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteStudent(studentId);
                    const deletedStudent = students.find((student) => student._id === studentId);
                    setStudents((prevStudents) => {
                        return prevStudents.filter((student) => student._id !== studentId)
                    });
                    
                    if (deletedStudent && deletedStudent.classroom !== '') {
                        dispatch(increaseSeatsLeft({
                            id: deletedStudent.classroom,
                            change: 1
                        }))
                    };

                    alertify.success("התלמיד נמחק בהצלחה");
                } catch (error) {
                    Swal.fire({
                        title: 'תקלה',
                        text: 'לא ניתן למחוק את התלמיד',
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

    return (
        <div>
            {status === "done" && studentsStatus === "done" && students.length > 0 && <div>
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
                items={availabeClassrooms}
                listType="classes"
                handleClick={assignToClass}
                />
            </div> }
            {status === "done" && studentsStatus === "done" && students.length === 0 &&
                <ErrorPage errorMessage="נראה מאוד בודד כאן, אין תלמידים" redirectMessage="לחץ כדי להוסיף תלמידים"></ErrorPage>
            }
            {(status === "loading" || studentsStatus === "loading") &&
                <LoadingContainer>
                    <Loading projectTheme={theme} size={"8rem"}></Loading>
                </LoadingContainer>
            }
            {(status === "failed" || studentsStatus === "failed") && (status !== "loading" && studentsStatus !== "loading") &&
                <NoConnection></NoConnection>
            }
        </div>
    )
}

export default Students;