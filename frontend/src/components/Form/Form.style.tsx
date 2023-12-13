import { Button, TextField, styled } from "@mui/material";
import { ThemeContextType } from "../../Types/types";

export const FormContainer = styled("div")({
    width: "100%",
    display: "flex",
    flexDirection:"column",
    alignItems: "center",
    fontFamily: "Heebo"
})

export const FormHeader = styled("div")({
    fontSize: "3rem",
    marginBottom: "2vh",
    marginTop: "4vh"
})

export const InputField = styled(TextField)({
    width: "12vw",
    height: "5vh",
    fontSize: "1.2rem",
    marginBottom: "1vh",
    marginLeft: "2vw",
    // border: "0.1px solid #858585",
    // borderRadius: "10px"
})

export const SubmitBtn = styled(Button, {
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{ projectTheme : ThemeContextType | null}>(({projectTheme}) => ({
    width: "16vw",
    height: "4vh",
    border: "none",
    backgroundColor: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    fontSize: "1.1rem",
    color: "#FFFFFF",
    cursor: "pointer",
    '&:hover' : {
        backgroundColor: projectTheme === "blue" ? "#3F50B5" : "#F50057",
        color: "#FFFFFF"
    }
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