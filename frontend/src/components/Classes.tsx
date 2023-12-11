import React from "react";
import * as S from "../Style/Classes.style";
import ClassCard from "./ClassCard";

const Classes : React.FC = () => {
    return (
        <S.classesContainer>
            <ClassCard />
        </S.classesContainer>
    )
}

export default Classes;