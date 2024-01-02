import { styled } from "@mui/material";
import { ThemeContextType } from "../../Types/types";

export const Container = styled("div",{
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{projectTheme : ThemeContextType}>(({ projectTheme, theme }) => ({
    color: projectTheme,
    height: "90vh",
    position: "relative",
    width: "100vw",
    overflow: "hidden",
    [theme.breakpoints.up("sm")]: {
        display: "grid",
        gridTemplate: "auto / repeat(2, 50vw)",
        direction: "rtl"
    },
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"  
    },
}));

export const ErrorImage = styled("img")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        height: "40vh",
        width: "40vh",
        marginRight: "auto"
    },
    [theme.breakpoints.only("sm")]: {
        height: "40vh",
        width: "40vh",
        marginRight: "auto",
        marginTop: "10vh"
    },
    [theme.breakpoints.only("xs")]: {
        height: "25vh",
        width: "25vh",
        marginRight: "auto",
        marginTop: "10vh"
    }
}));

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