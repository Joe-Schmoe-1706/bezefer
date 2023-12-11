import {TableBody, TableHead, TableRow } from "@mui/material";
import React, {useState} from "react"
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Students.style"
import PopupList from "../PopupList/PopupList"

const Students : React.FC = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const students = [
        {
            id: "326570330",
            firstName: "מתן",
            lastName: "גולדברג",
            age: 19,
            proffestion: "ראפר"
        },
        {
            id: "333222111",
            firstName: "קווין",
            lastName: "דה בריינה",
            age: 33,
            proffestion: "כדורגלן"
        },
        {
            id: "777888999",
            firstName: "טיילור",
            lastName: "סוויפט",
            age: 32,
            proffestion: "זמרת"
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

    const renderedRows = students.map(studnet => {
        return (
            <TableRow>
                <S.StyledTableCell>{studnet.id}</S.StyledTableCell>
                <S.StyledTableCell>{studnet.firstName}</S.StyledTableCell>
                <S.StyledTableCell>{studnet.lastName}</S.StyledTableCell>
                <S.StyledTableCell>{studnet.age}</S.StyledTableCell>
                <S.StyledTableCell>{studnet.proffestion}</S.StyledTableCell>
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme} onClick={openPopup}>ASSIGN TO CLASS</S.DynamicButton>
                </S.StyledTableCell>
                <S.StyledTableCell>
                    <S.DynamicButton variant="outlined" projectTheme={theme}>DELETE</S.DynamicButton>
                </S.StyledTableCell>
            </TableRow>
        )
    })

    return (
       <div>
        <S.StudentTableContainer>
            <S.StudentTable>
                <TableHead>
                    <TableRow>
                        <S.StyledTableCell>ID</S.StyledTableCell>
                        <S.StyledTableCell>First Name</S.StyledTableCell>
                        <S.StyledTableCell>Last Name</S.StyledTableCell>
                        <S.StyledTableCell>Age</S.StyledTableCell>
                        <S.StyledTableCell>Proffestion</S.StyledTableCell>
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