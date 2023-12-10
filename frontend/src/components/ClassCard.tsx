import React from "react";
import * as S from "./ClassCard.style"

const ClassCard : React.FC = () => {
    return (
        <S.ClassCard>
            <S.ClassName>אלון</S.ClassName>
            <S.SeatsLeft>There are 2 seats left</S.SeatsLeft>
        </S.ClassCard>
    )
}

export default ClassCard;