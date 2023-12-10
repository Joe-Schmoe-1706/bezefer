import { styled, IconButton } from "@mui/material"
import DeleteIcon from '@mui/icons-material/Delete';
import { ThemeContextType } from "../Types/types";

export const DeleteButton = styled(IconButton)({
    height: "5vh",
    width: "5vh",
    marginLeft: "1vw"
})

export const CustomDeleteIcon = styled(DeleteIcon)<{projectTheme : ThemeContextType | null}>(({ projectTheme }) => ({
    width: "2vw",
    height: "2vw",
    color: projectTheme === "blue" ? "#3F50B5" : "#F50057"
}))