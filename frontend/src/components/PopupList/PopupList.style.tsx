import {ListItemAvatar, ListItemText, Modal, styled} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { ThemeContextType } from "../../Types/types";
import AddIcon from '@mui/icons-material/Add';

export const StudentModal = styled(Modal)({
    width: "14vw",
    height: "14vh",
    fontFamily: "Heebo, sans-serif",
    marginLeft: "40vw",
    marginTop: "40vh"
})

export const ModalHeader = styled("div")({
    marginLeft: "2vw",
    fontSize: "1.25rem",
    fontWeight: "600"
})

export const ProfileIcon = styled(PersonIcon)({
    width: "3vh",
    height: "3vh",
    backgroundColor: "#C4C4C4"
})

export const StudentIcon = styled(SchoolIcon)({
    width: "3vh",
    height: "3vh",
    backgroundColor: "#C4C4C4"
})

export const Name = styled(ListItemText)({
    
})

export const ModalContent = styled("div")({
    backgroundColor: "#FFFFFF"
})

export const ListAvatar = styled(ListItemAvatar)({
    marginLeft: "1vw"
})

export const PlusIcon = styled(AddIcon)<{projectTheme : ThemeContextType | null}>(({ projectTheme }) => ({
    width: "2vw",
    height: "2vw",
    color: projectTheme === "blue" ? "#3F50B5" : "#F50057"
}))