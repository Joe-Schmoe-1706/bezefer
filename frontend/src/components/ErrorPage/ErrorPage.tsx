import React from "react";
import { Props } from "./ErrorPage.types";
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./ErrorPage.style"
import notFoundBlue from "../../assets/not_found_blue.jpg"
import notFoundRed from "../../assets/not_found_red.jpg"
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC<Props> = ({errorMessage, redirectMessage}) => {
    const theme = useTheme();

    const navigate = useNavigate();

    const redirect = () => {
        navigate('/create');
    }

    return (
        <S.Container projectTheme={theme}>
            <S.ContentContainer>
                <S.ErrorMessage>
                    {errorMessage}
                </S.ErrorMessage>
                <S.redirectMessage onClick={redirect}>
                    {redirectMessage}
                </S.redirectMessage>
            </S.ContentContainer>
            <S.ContentContainer>
                <S.ErrorImage src={theme === "blue" ? notFoundBlue : notFoundRed}>
                </S.ErrorImage>
            </S.ContentContainer>
        </S.Container>
    )
}

export default ErrorPage