import { Button, FormHelperText, TextField, styled } from "@mui/material";
import { ColorOption } from "../../Types/types";

export const FormContainer = styled("div")(({ theme }) => ({
    width: "100%",
    display: "flex",
    flexDirection:"column",
    alignContent: "center",
    alignItems: "center",
    fontFamily: "Heebo",
    [theme.breakpoints.down("md")]: {
        marginBottom: "20vh"
    }
}))

export const FormHeader = styled("div")(({ theme }) => ({
    marginBottom: "2vh",
    marginTop: "4vh",
    [theme.breakpoints.up("md")]: {
        fontSize: "3rem"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "2.25rem"
    }
}))

export const InputField = styled(TextField)(({ theme }) => ({
    [theme.breakpoints.only("xl")]: {
        marginLeft: "2vw",
        width: "12vw",
        height: "5vh",
        fontSize: "1.2rem",
        marginBottom: "1vh"
    },
    [theme.breakpoints.only("lg")]: {
        width: "23vw",
        height: "5vh",
        fontSize: "1.2rem",
        marginBottom: "1vh"
    },
    [theme.breakpoints.only("md")]: {
        marginLeft: "3vw",
        width: "25vw",
        height: "5vh",
        fontSize: "1.2rem",
        marginBottom: "1vh"
    },
    [theme.breakpoints.only("sm")]: {
        width: "50vw",
        height: "7vh",
        fontSize: "1.2rem",
        marginBottom: "1vh",
    },
    [theme.breakpoints.only("xs")]: {
        width: "70vw",
        height: "7vh",
        fontSize: "1.2rem",
        marginBottom: "0.5vh"
    },
    // border: "0.1px solid #858585",
    // borderRadius: "10px"
}))

export const SubmitBtn = styled(Button, {
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{ projectTheme : ColorOption}>(({projectTheme, theme}) => ({
    border: "none",
    backgroundColor: projectTheme,
    color: "#FFFFFF",
    cursor: "pointer",
    '&:hover' : {
        backgroundColor: projectTheme,
        color: "#FFFFFF"
    },
    ":disabled": {
        backgroundColor: "#e9ecef"
    },
    [theme.breakpoints.only("xl")]: {
        width: "16vw",
        height: "4vh",
        fontSize: "1.1rem"
    },
    [theme.breakpoints.only("lg")]: {
        width: "16vw",
        height: "4vh",
        fontSize: "1.1rem",
        marginLeft: "3vw"
    },
    [theme.breakpoints.only("md")]: {
        width: "16vw",
        height: "4vh",
        fontSize: "1.1rem",
        marginLeft: "8vw"
    },
    [theme.breakpoints.only("sm")]: {
        width: "35vw",
        height: "4vh",
        fontSize: "0.9rem",
        marginLeft: "7vw"
    },
    [theme.breakpoints.only("xs")]: {
        width: "50vw",
        height: "4vh",
        fontSize: "0.9rem",
        marginLeft: "12vw"
    },
}))

export const StyledForm = styled("form")({
    display: "flex",
    flexDirection:"column"
})

export const ErrorMessage = styled("div", {
    shouldForwardProp: (prop) => prop !== "showError"
})<{showError : boolean}>(({showError}) => ({
    color: "#fc0303",
    marginTop: "2vh",
    visibility: showError ? "visible" : "hidden"
}))

export const HelperText = styled(FormHelperText, {
    shouldForwardProp: (prop) => prop !== "isError" 
})<{isError: boolean, isEmpty: boolean}>(({ theme, isError, isEmpty }) => ({
    textAlign: "right",
    direction: "rtl",
    color: isEmpty ? "#000000" : isError ? "#fc0303" : "#43A047",
    [theme.breakpoints.only("xl")]: {
        marginRight: "2vw",
        marginBottom: "1vh",
    },
    [theme.breakpoints.only("lg")]: {
        marginBottom: "3vh",
    },
    [theme.breakpoints.only("md")]: {
        marginBottom: "3vh",
    },
    [theme.breakpoints.only("sm")]: {
        marginBottom: "3vh",
        marginRight: "1vw",
    },
    [theme.breakpoints.only("xs")]: {
        marginBottom: "2vh",
        marginRight: "2vw",
    },
}))
