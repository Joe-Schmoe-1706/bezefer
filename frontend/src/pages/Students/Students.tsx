import {TableBody, TableHead, TableRow } from "@mui/material";
import React, { useState } from "react"
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Students.style"
import PopupList from "../../components/PopupList/PopupList"
import { Student } from "../../Types/types";
import Swal from "sweetalert2";
import { dataTableHeader, tableHeaders } from "./Students.consts";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectAvailableClassrooms } from "../../state/reducers/classroomSlice";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import { Loading, LoadingContainer } from "../Classes/Classes.style";
import NoConnection from "../../components/NoConnection/NoConnection";
import { addToClassHandler, deleteStudentHandler, selectStudents } from "../../state/reducers/studentSlice";
import { selectStatus } from "../../state/reducers/status";
import SchoolIcon from '@mui/icons-material/School';
import AddIcon from '@mui/icons-material/Add';

const Students : React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    // const [students, setStudents] = useState<Student[]>([]);
    const [chosenStudentId, setChosenStudentId] = useState<string>('');
    // const [studentsStatus, setStudentStatus] = useState<StatusOptions>("loading");

    const availabeClassrooms = useAppSelector(selectAvailableClassrooms);
    const dispatch = useAppDispatch();
    const students = useAppSelector(selectStudents);
    const status = useAppSelector(selectStatus);

    // useEffect(() => {
    //     const initializeStudents = async (): Promise<void> => {
    //         try {
    //             const allStudents = await getAllStudents();
    //             setStudents(allStudents);
    //             setStudentStatus("done");
    //         } catch (error) {
    //             Swal.fire({
    //                 icon: 'error',
    //                 title: 'תקלה',
    //                 text: 'לא ניתן לקבל את התלמידים'
    //             })
    //             setStudentStatus("failed");
    //         }
    //     }

    //     initializeStudents();
    // }, [])

    const openPopup = (studentId : string) : void => {
        setChosenStudentId(studentId);
        setIsPopupOpen(true);
    }

    const closePopup = () : void => {
        setIsPopupOpen(false);
    }

    const assignToClass = async (classroomId: string) : Promise<void> => {
        try {
            closePopup();
            // await addStudentToClass(chosenStudentId, classroomId);
            // setStudents((prevStudents) => {
            //     return prevStudents.map((student) => {
            //         return student._id === chosenStudentId ?
            //         {
            //             ...student,
            //             classroom: classroomId
            //         } :
            //         student
            //     })
            // });

            // dispatch(decreaseSeatsLeft({
            //     id: classroomId,
            //     change: 1
            // }));

            await dispatch(addToClassHandler(chosenStudentId, classroomId));

            alertify.success("התלמיד השתבץ לכיתה בהצלחה")
        } catch (error: any) {

            if (error.response && error.response.data === 509) {
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

    const deleteSelectedStudent = async (student: Student) => {
        Swal.fire({
            title: 'האם אתה בטוח?',
            showCancelButton: true,
            confirmButtonText: "מחק",
            cancelButtonText: "בטל"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    // await deleteStudent(studentId);
                    // const deletedStudent = students.find((student) => student._id === studentId);
                    // setStudents((prevStudents) => {
                    //     return prevStudents.filter((student) => student._id !== studentId)
                    // });
                    
                    // if (deletedStudent && deletedStudent.classroom !== '') {
                    //     dispatch(increaseSeatsLeft({
                    //         id: deletedStudent.classroom,
                    //         change: 1
                    //     }))
                    // };

                    await dispatch(deleteStudentHandler(student));

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

    const classroomsToModal = availabeClassrooms.map((classroom) => {
        return {
            text: classroom.name,
            _id: classroom._id
        }
    });

    const renderedStudentValues = (student: Student) : JSX.Element[] => {
        const renderedValues = [];

        for (let index = 0; index < dataTableHeader.length; index ++) {
            renderedValues.push(<S.StyledTableCell>{student[dataTableHeader[index]] ?? ""}</S.StyledTableCell>)
        }

        return renderedValues;
    } 

    const renderedRows : JSX.Element[] = [...students].map(([, student]) => {
        return (
            <TableRow>
                {renderedStudentValues(student)}
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={() => openPopup(student._id)} disabled={student.classroom != ''}>ASSIGN TO CLASS</S.DynamicButton>
                </S.StyledTableCell>
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={() => deleteSelectedStudent(student)}>DELETE</S.DynamicButton>
                </S.StyledTableCell>
            </TableRow>
        )
    });

    const renderedHeaders : JSX.Element[] = tableHeaders.map((header) => {
        return <S.StyledTableCell>{header}</S.StyledTableCell>
    });

    return (
        <div>
            {status === "done" && status === "done" && students.size > 0 && <div>
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
                items={classroomsToModal}
                header="available classroom"
                errorMessage="אין כיתות זמינות כרגע"
                avatar={<SchoolIcon/>}
                actionIcon={<AddIcon/>}
                handleClick={assignToClass}
                />
            </div> }
            {status === "done" && students.size === 0 &&
                <ErrorPage errorMessage="נראה מאוד בודד כאן, אין תלמידים" redirectMessage="לחץ כדי להוסיף תלמידים"></ErrorPage>
            }
            {(status === "loading") &&
                <LoadingContainer>
                    <Loading projectTheme={theme} size={"8rem"}></Loading>
                </LoadingContainer>
            }
            {(status === "failed") &&
                <NoConnection></NoConnection>
            }
        </div>
    )
}

export default Students;