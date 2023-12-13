import {TableBody, TableHead, TableRow } from "@mui/material";
import React, {useState} from "react"
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Students.style"
import PopupList from "../PopupList/PopupList"
import { Student } from "./Students.types";

const Students : React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const students : Student[] = [
        {
            id: "326570330",
            firstName: "מתן",
            lastName: "גולדברג",
            age: 19,
            profession: "ראפר"
        },
        {
            id: "333222111",
            firstName: "קווין",
            lastName: "דה בריינה",
            age: 33,
            profession: "כדורגלן"
        },
        {
            id: "777888999",
            firstName: "טיילור",
            lastName: "סוויפט",
            age: 32,
            profession: "זמרת"
        }
    ];

    const classes = [
        {
            id: 1,
            name: "יוסי"
        },
        {
            id: 2,
            name: "קרלו"
        },
        {
            id: 3,
            name: "קיטלרו"
        }
    ]

    const openPopup = () : void => {
        setIsPopupOpen(true);
    }

    const closePopup = () : void => {
        setIsPopupOpen(false);
    }

    const theme = useTheme();
    console.log(theme)

    const renderedStudentValues = (student : Student) : JSX.Element[] => {
        return Object.values(student).map((value) => {
            return (
                <S.StyledTableCell>{value}</S.StyledTableCell>
            )
        })
    } 

    const renderedRows : JSX.Element[] = students.map(studnet => {
        return (
            <TableRow>
                {renderedStudentValues(studnet)}
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={openPopup}>ASSIGN TO CLASS</S.DynamicButton>
                </S.StyledTableCell>
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme}>DELETE</S.DynamicButton>
                </S.StyledTableCell>
            </TableRow>
        )
    });

    const getCapitalPosition = (string : string) => {
        for (let index = 0; index < string.length; index++) {
            if (string.charAt(index) !== string.charAt(index).toLocaleLowerCase()) {
                return index;
            }
        }

        return -1;
    }

    const renderedHeaders : JSX.Element[] = Object.keys(students[0]).map((key) => {
        let header = key;
        const capitalLetterPosition = getCapitalPosition(header);

        if (capitalLetterPosition === -1) {
            header = header.charAt(0).toLocaleUpperCase() + header.substring(1);
        } else {
            header = header.charAt(0).toLocaleUpperCase() + 
            header.substring(1, capitalLetterPosition) + 
            ' ' + header.substring(capitalLetterPosition);
        }
        
        return (
            <S.StyledTableCell>{header}</S.StyledTableCell>
        )
    })

    return (
       <div>
        <S.StudentTableContainer>
            <S.StudentTable>
                <TableHead>
                    <TableRow>
                        {renderedHeaders}
                        <S.StyledTableCell>Assign</S.StyledTableCell>
                        <S.StyledTableCell>Delete</S.StyledTableCell>
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
            items={classes}
            listType="classes"
            handleClick={() => console.log("click")}
            />
       </div>
    )
}

export default Students;