import { styled, IconButton, CircularProgress } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeContextType } from "../Types/types";

export const ButtonIcon = styled(IconButton)<{projectTheme : ThemeContextType}>(({ theme, projectTheme }) => ({
    color: projectTheme,
    [theme.breakpoints.only("xl")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "1vw"
    },
    [theme.breakpoints.only("lg")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "1vw"
    },
    [theme.breakpoints.only("md")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "3vw"
    },
    [theme.breakpoints.only("sm")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "7vw"
    },
    [theme.breakpoints.only("xs")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "7vw"
    }
}))

export const CustomDeleteIcon = styled(DeleteIcon)<{projectTheme : ThemeContextType}>(({ projectTheme, theme }) => ({
    [theme.breakpoints.only("xl")]: {
        width: "2vw",
        height: "2vw",
    },
    [theme.breakpoints.only("lg")]: {
        width: "3vw",
        height: "3vw",
    },
    [theme.breakpoints.only("md")]: {
        width: "3.5vw",
        height: "3.5vw",
    },
    [theme.breakpoints.only("sm")]: {
        width: "5vw",
        height: "5vw",
    },
    [theme.breakpoints.only("xs")]: {
        width: "9vw",
        height: "9vw",
    },
    color: projectTheme
}))