import { styled } from "@mui/material";
import { ThemeContextType } from "../../Types/types";

export const Container = styled("div",{
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{projectTheme : ThemeContextType | null}>(({ projectTheme }) => ({
    display: "grid",
    gridTemplate: "auto / repeat(2, 50vw)",
    color: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    height: "90vh",
    position: "relative",
    width: "100vw",
    overflow: "hidden"
}));

export const ErrorImage = styled("img")({
    height: "40vh",
    width: "40vh",
    left: "0"
});

export const ErrorMessage = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "right",
    marginRight: "2vw",
    fontSize: "1.5rem",
});

export const redirectMessage = styled("div")({
    textAlign: "right",
    marginTop: "2vh",
    fontSize: "1.75rem",
    cursor: "pointer",
    textDecoration: "underline",
    '&:hover' : {
        opacity: "0.7"
    },
    marginRight: "2vw",
})

export const ContentContainer = styled("div")({
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
})