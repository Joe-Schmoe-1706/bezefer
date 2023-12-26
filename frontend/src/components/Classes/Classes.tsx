import React from "react";
import * as S from "./Classes.style";
import ClassCard from "../ClassCard/ClassCard";
import { Classroom, StatusOptions } from "../../Types/types";
import { deleteClassroom } from "../../api/classrooms.api";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { useAppDispatch, useAppSelector } from "../../hooks";
import { selectClassroom, deleteClass } from "../../state/reducers/classroomSlice";
import ErrorPage from "../ErrorPage/ErrorPage";
import NoConnection from "../NoConnection/NoConnection";
import { useTheme } from "../../Context/ThemeContext";

const Classes : React.FC<{
    status: StatusOptions
}> = ({status}) => {
    const classrooms: Classroom[] = useAppSelector(selectClassroom);
    const dispatch = useAppDispatch();
    const theme = useTheme();



    const deleteClassHandler = async (classroomId: string) => {
       Swal.fire({
        title: 'are you sure you want to delete the classroom?',
        showCancelButton: true,
        confirmButtonText: 'Delete'
       }).then(async (result) => {
            if (result.isConfirmed) {
                const selectedClass = classrooms?.find(classroom => classroom._id === classroomId);
                if (selectedClass?.numberOfSeats === selectedClass?.seatsLeft) {
                    try {
                        await deleteClassroom(classroomId);
        
                        dispatch(deleteClass({
                            id: classroomId
                        }));
            
                        alertify.success("class deleted successfully");
                    } catch (error: any) {
                        Swal.fire({
                            title: 'error',
                            text: error.response.data.message,
                            icon: 'error'
                        });
                    }
                } else {
                    Swal.fire({
                        title: 'error',
                        text: 'cannot delete classroom that has student',
                        icon: 'error'
                    });
                }
            }
       })
    }

    const renderedClassrooms = classrooms?.map((oldClassroom) => {
        return <ClassCard classroom={oldClassroom} deleteClass={deleteClassHandler}/>
    })

    return (
        <div>
            {status === "done" && classrooms.length !== 0 && <S.classesContainer>
                {renderedClassrooms}
            </S.classesContainer> }
            {status === "done" && classrooms.length === 0 && 
                <ErrorPage errorMessage="נראה מאוד בודד כאן, אין כיתות כרגע" redirectMessage="לחץ כדי להוסיף כיתה"></ErrorPage>
            }
            {status === "failed" && 
                <NoConnection></NoConnection>
            }
            {status === "loading" && 
                <S.LoadingContainer>
                    <S.Loading projectTheme={theme} size={"8rem"}></S.Loading>
                </S.LoadingContainer>
            }
        </div>

    )
}

export default Classes;