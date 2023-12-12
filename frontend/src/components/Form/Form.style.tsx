import { styled } from "@mui/material";
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

export const InputField = styled("input")({
    width: "12vw",
    height: "5vh",
    fontSize: "1.2rem",
    marginBottom: "1vh",
    marginLeft: "2vw",
    border: "0.1px solid #858585",
    borderRadius: "10px"
})

export const SubmitBtn = styled("button")<{ projectTheme : ThemeContextType | null}>(({projectTheme}) => ({
    width: "16vw",
    height: "4vh",
    border: "none",
    backgroundColor: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    fontSize: "1.1rem",
    color: "#FFFFFF"
}))

export const StyledForm = styled("form")({
    display: "flex",
    flexDirection:"column"
})