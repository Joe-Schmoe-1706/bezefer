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

    // let imageSrc = notFoundBlue;

    // if (theme. === "#F50057") {
    //     imageSrc = notFoundRed;
    // } else if (theme === "#2a850e") {
    //     imageSrc = notFoundGreen;
    // } else if (theme === "#4d0b0a") {
    //     imageSrc = notFoundBrown;
    // } else if (theme === "#5c5248") {
    //     imageSrc = notFoundGray;
    // } else if (theme === "#7b2cbf") {
    //     imageSrc = notFoundPurple;
    // }

    return (
        <S.Container projectTheme={theme.hex}>
            <S.ContentContainer>
                <S.ErrorImage src={`../../assests/not_found_${theme.name}`}>
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