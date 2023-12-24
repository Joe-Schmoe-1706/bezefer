import { styled, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeContextType } from "../Types/types";

export const ButtonIcon = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "1vw"
    },
    [theme.breakpoints.down("md")]: {
        height: "5vh",
        width: "5vh",
        marginLeft: "7vw"
    }
}))

export const CustomDeleteIcon = styled(DeleteIcon)<{projectTheme : ThemeContextType | null}>(({ projectTheme, theme }) => ({
    [theme.breakpoints.up("lg")]: {
        width: "2vw",
        height: "2vw",
    },
    [theme.breakpoints.down("md")]: {
        width: "9vw",
        height: "9vw",
    },
    color: projectTheme === "blue" ? "#3F50B5" : "#F50057"
}))