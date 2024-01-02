import React from "react";
import * as S from "./NoConnection.style";
import errorImage from "../../assets/error.jpg";

const NoConnection: React.FC = () => {
    return (
        <S.Container>
            <S.ErrorImage src={errorImage} />
            <S.ErrorMessage>אין חיבור למסד הנתונים</S.ErrorMessage>
        </S.Container>
    )
}

export default NoConnection;