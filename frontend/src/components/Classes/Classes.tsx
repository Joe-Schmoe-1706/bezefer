import React, {useState, useEffect} from "react";
import * as S from "./Classes.style";
import ClassCard from "../ClassCard/ClassCard";
import { Classroom } from "../../Types/types";
import { deleteClassroom, getAllClassrooms } from "../../api/classrooms.api";
import Swal from "sweetalert2";
import alertify from "alertifyjs";
import 'alertifyjs/build/css/alertify.css';
import { ErrorSharp } from "@mui/icons-material";

const Classes : React.FC = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>([]);
    
    useEffect(() => {
        const getClassrooms = async () => {
            try {
                const newClassrooms = await getAllClassrooms();
                console.log(newClassrooms);
                setClassrooms(newClassrooms);
            } catch(error) {
                console.log(error)
                Swal.fire({
                    title: 'error',
                    text: 'could not load classses',
                    icon: 'error'
                });
            }
        };

        getClassrooms();
    }, []);

    const deleteClass = async (classroomId: string) => {
       Swal.fire({
        title: 'are you sure you want to delete the classroom?',
        showCancelButton: true,
        confirmButtonText: 'Delete'
       }).then(async (result) => {
            if (result.isConfirmed) {
                const selectedClass = classrooms?.find(classroom => classroom._id === classroomId);
                if (selectedClass?.numberOfSeats === selectedClass?.numberOfSeatsLeft) {
                    await deleteClassroom(classroomId);
        
                    setClassrooms((oldClassrooms) => {
                        return oldClassrooms.filter(classroom => classroom._id !== classroomId)
                    });
        
                    alertify.success("class deleted successfully");
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
        return <ClassCard classroom={oldClassroom} deleteClass={deleteClass}/>
    })

    return (
        <div>
            <S.classesContainer>
                {renderedClassrooms}
            </S.classesContainer>
            <S.NoClassesMessage isShown={classrooms.length === 0}>There are no classrooms</S.NoClassesMessage>
        </div>

    )
}

export default Classes;