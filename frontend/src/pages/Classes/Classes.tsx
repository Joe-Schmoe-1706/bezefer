import React from "react";
import * as S from "./Classes.style";
import ClassCard from "../../components/ClassCard/ClassCard";
import { Classroom } from "../../Types/types";
import { deleteClassroom } from "../../api/classrooms.api";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectClassroom, deleteClass } from "../../state/reducers/classroomSlice";
import ErrorPage from "../../components/ErrorPage/ErrorPage";
import NoConnection from "../../components/NoConnection/NoConnection";
import { useTheme } from "../../Context/ThemeContext";
import { selectStatus } from "../../state/reducers/status";

const Classes : React.FC = () => {
    const classrooms: Classroom[] = useAppSelector(selectClassroom);
    const dispatch = useAppDispatch();
    const {theme} = useTheme();

    const status = useAppSelector(selectStatus);



    const deleteClassHandler = async (classroom: Classroom) => {
       Swal.fire({
        title: 'האם אתה בטוח ברצונך למחוק את הכיתה',
        showCancelButton: true,
        confirmButtonText: 'מחק',
        cancelButtonText: 'בטל'
       }).then(async (result) => {
            if (result.isConfirmed) {
                if (classroom.capacity === classroom.seatsLeft) {
                    try {
                        await deleteClassroom(classroom);
        
                        dispatch(deleteClass({
                            id: classroom._id
                        }));
            
                        alertify.success("הכיתה נמחקה בהצלחה");
                    } catch (error: any) {
                        Swal.fire({
                            title: 'תקלה',
                            text: 'לא ניתן למחוק את הכיתה',
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'תקלה',
                        text: 'לא ניתן למחוק כיתה שבה יש תלמידים',
                        icon: 'error'
                    });
                }
            }
       })
    }

    const renderedClassrooms = classrooms?.map((oldClassroom) => {
        return <ClassCard classroom={oldClassroom} deleteClass={deleteClassHandler}/>
    })

    switch (status) {
        case "done":
            return (
                classrooms.length !== 0 ?
                <S.classesContainer>
                {renderedClassrooms}
                </S.classesContainer>
                : 
                <ErrorPage
                errorMessage="נראה מאוד בודד כאן, אין כיתות כרגע"
                redirectMessage="לחץ כדי להוסיף כיתה"
                />
            );
        case "failed":
          return <NoConnection />;
        case "loading":
          return (
            <S.LoadingContainer>
              <S.Loading projectTheme={theme.hex} size={"8rem"}></S.Loading>
            </S.LoadingContainer>
          );
        default:
          return null;
      }
}

export default Classes;