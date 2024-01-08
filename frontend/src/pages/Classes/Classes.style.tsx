import {CircularProgress, styled} from "@mui/material";
import { ColorOption } from "../../Types/types";

export const classesContainer = styled("div")(({ theme }) => ({
    [theme.breakpoints.only("xl")]: {
        display: "grid",
        gridTemplate: "auto auto / repeat(6,1fr)",
        gap: "2vw",
        paddingLeft: "2vw"
    },
    [theme.breakpoints.only("lg")]: {
        display: "grid",
        gridTemplate: "auto auto / repeat(4,1fr)",
        gap: "2vw",
        paddingLeft: "2vw"
    },
    [theme.breakpoints.only("md")]: {
        display: "grid",
        gridTemplate: "auto auto / repeat(3,1fr)",
        gap: "2vw",
        paddingLeft: "2vw"
    },
    [theme.breakpoints.only("sm")]: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center", 
    },
    [theme.breakpoints.only("xs")]: {
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center", 
    },
    marginTop : "8vh",
    width: "100vw",
}));

export const NoClassesMessage = styled("div",{
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{isShown : boolean}>(({isShown}) => ({
    textAlign: 'center',
    fontSize: "3rem",
    visibility: isShown ? "visible" : "hidden"
}));

export const LoadingContainer = styled("div")({
    marginLeft: "45vw",
    marginTop: "35vh"
})

export const Loading = styled(CircularProgress, {
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{projectTheme: ColorOption}>(({projectTheme}) => ({
    color: projectTheme
}))