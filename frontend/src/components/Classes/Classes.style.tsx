import {styled} from "@mui/material";

export const classesContainer = styled("div")({
    display: "grid",
    gridTemplate: "auto auto / repeat(6,1fr)",
    gap: "2vw",
    marginTop : "8vh",
    width: "100vw",
    paddingLeft: "2vw"
});

export const NoClassesMessage = styled("div",{
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{isShown : boolean}>(({isShown}) => ({
    textAlign: 'center',
    fontSize: "3rem",
    visibility: isShown ? "visible" : "hidden"
}));