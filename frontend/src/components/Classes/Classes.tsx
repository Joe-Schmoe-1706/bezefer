import React, {useState, useEffect} from "react";
import * as S from "./Classes.style";
import ClassCard from "../ClassCard/ClassCard";
import { Classroom } from "../../Types/types";
import { getAllClassrooms } from "../../api/classrooms.api";

const Classes : React.FC = () => {
    const [classrooms, setClassrooms] = useState<Classroom[]>();
    
    useEffect(() => {
        const getClassrooms = async () => {
            const newClassrooms = await getAllClassrooms();
            setClassrooms(newClassrooms);
        };

        getClassrooms();
    }, [classrooms]);

    const renderedClassrooms = classrooms?.map((oldClassroom) => {
        return <ClassCard classroom={oldClassroom} />
    })

    return (
        <S.classesContainer>
            {renderedClassrooms}
        </S.classesContainer>
    )
}

export default Classes;