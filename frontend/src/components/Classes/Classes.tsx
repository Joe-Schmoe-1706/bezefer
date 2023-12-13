import React from "react";
import * as S from "./Classes.style";
import ClassCard from "../ClassCard/ClassCard";

const Classes : React.FC = () => {
    return (
        <S.classesContainer>
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
            <ClassCard />
        </S.classesContainer>
    )
}

export default Classes;