import {ListItemAvatar, ListItemText, Modal, styled} from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DeleteButton } from "./DeleteIcon.style";

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

export const ProfileIcon = styled(AccountCircleIcon)({
    width: "2vh",
    height: "2vh",
    color: "#C4C4C4"
})

export const StudentName = styled(ListItemText)({
    
})

export const ModalContent = styled("div")({
    backgroundColor: "#FFFFFF"
})

export const ListAvatar = styled(ListItemAvatar)({
    marginLeft: "1vw"
})