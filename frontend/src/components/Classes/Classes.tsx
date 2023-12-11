import React from "react";
import * as S from "./Classes.style";
import ClassCard from "../ClassCard/ClassCard";

const Classes : React.FC = () => {
    return (
        <S.classesContainer>
            <ClassCard />
        </S.classesContainer>
    )
}

export default Classes;