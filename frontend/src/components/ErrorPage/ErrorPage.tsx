import React from "react";
import { ErrorProps } from "./ErrorPage.types";
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./ErrorPage.style"
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC<ErrorProps> = ({errorMessage, redirectMessage}) => {
    const {theme} = useTheme();

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/create');
    }

    return (
        <S.Container projectTheme={theme.hex}>
            <S.ContentContainer>
                <S.ErrorImage src={`not_found_${theme.name}.jpg`}>
                </S.ErrorImage>
            </S.ContentContainer>
            <S.ContentContainer>
                <S.ErrorMessage>
                    {errorMessage}
                </S.ErrorMessage>
                <S.redirectMessage onClick={redirect}>
                    {redirectMessage}
                </S.redirectMessage>
            </S.ContentContainer>
        </S.Container>
    )
}

export default ErrorPage