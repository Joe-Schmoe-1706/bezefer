import { styled } from "@mui/material"

export const FormsContainer = styled("div")(({ theme }) => ({
    [theme.breakpoints.up("md")]: {
        display: "grid",
        gridTemplate: "auto / repeat(2, 50vw)"
    },
    [theme.breakpoints.down("md")]: {
        display: "flex",
        flexDirection:"column"
    },
    zIndex: "-1"
}))