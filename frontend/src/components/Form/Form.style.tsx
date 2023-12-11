import { styled } from "@mui/material";
import { ThemeContextType } from "../../Types/types";

export const FormContainer = styled("div")({
    width: "100%",
    alignItems: "center",
    display: "flex",
    flexDirection:"column"
})

export const formHeader = styled("div")({
    fontSize: "2rem"
})

export const InputField = styled("input")<{fieldRequired : boolean}>(({fieldRequired}) => ({
    width: "10vw",
    height: "5vh",
    fontSize: "1.5rem",
    '&::after': {
        content: fieldRequired ? '"*"' : '""'
    }
}))

export const submitBtn = styled("button")<{ projectTheme : ThemeContextType | null}>(({projectTheme}) => ({
    width: "12vh",
    backgroundColor: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    fontSize: "1.1rem"
}))

export const StyledForm = styled("form")({
    display: "flex",
    flexDirection:"column"
})