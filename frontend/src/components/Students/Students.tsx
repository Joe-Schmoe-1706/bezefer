import {TableBody, TableHead, TableRow } from "@mui/material";
import React, {useEffect, useState} from "react"
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Students.style"
import PopupList from "../PopupList/PopupList"
import { Student } from "./Students.types";
import { Classroom } from "../../Types/types";
import { getStudentsDTO } from "../../api/students.api";
import Swal from "sweetalert2";
import { getAvailableClassrooms } from "../../api/classrooms.api";
import { tableHeaders } from "./Students.consts";

const Students : React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [availableClassrooms, setAvailableClassroom] = useState<Classroom[]>([]);
    const [students, setStudents] = useState<Student[]>([]);

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

    const openPopup = () : void => {
        setIsPopupOpen(true);
    }

    const closePopup = () : void => {
        setIsPopupOpen(false);
    }

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

    const renderedRows : JSX.Element[] = students.map((studnet) => {
        return (
            <TableRow>
                {renderedStudentValues(studnet)}
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={openPopup} disabled={studnet.classroom != ''}>ASSIGN TO CLASS</S.DynamicButton>
                </S.StyledTableCell>
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme}>DELETE</S.DynamicButton>
                </S.StyledTableCell>
            </TableRow>
        )
    });

    const renderedHeaders : JSX.Element[] = tableHeaders.map((header) => {
        return <S.StyledTableCell>{header}</S.StyledTableCell>
    });

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
            items={availableClassrooms}
            listType="classes"
            handleClick={() => console.log("click")}
            />
       </div>
    )
}

export default Students;