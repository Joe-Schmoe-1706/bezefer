import {ListItemAvatar, ListItemText, Modal, styled} from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import { ColorOption } from "../../Types/types";
import AddIcon from '@mui/icons-material/Add';

export const GenericModal = styled(Modal)(({ theme }) => ({
    fontFamily: "Heebo, sans-serif",
    [theme.breakpoints.only("xl")]: {
        marginLeft: "40vw",
        marginTop: "40vh",
        width: "14vw",
        height: "30vh"
    },
    [theme.breakpoints.only("lg")]: {
        marginLeft: "40vw",
        marginTop: "40vh",
        width: "14vw",
        height: "14vh"
    },
    [theme.breakpoints.only("md")]: {
        marginLeft: "40vw",
        marginTop: "40vh",
        width: "25vw",
        height: "14vh"
    },
    [theme.breakpoints.only("sm")]: {
        marginLeft: "35vw",
        marginTop: "40vh",
        width: "30vw",
        height: "20vh"
    },
    [theme.breakpoints.only("xs")]: {
        marginLeft: "20vw",
        marginTop: "40vh",
        width: "60vw",
        height: "20vh"
    },
    overflow: "auto",
    overflowX: "hidden"
}))

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

export const ErrorContent = styled("div")({
    backgroundColor: "#FFFFFF",
    height: "10vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
});

export const ErrorModalHeader = styled("div")({
    fontSize: "1rem",
    fontWeight: "600",
    textAlign: 'center',
    color: "#F50053"
})

export const PlusIcon = styled(AddIcon, {
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{projectTheme : ColorOption}>(({ projectTheme, theme }) => ({
    [theme.breakpoints.up("md")]: {
        width: "2vw",
        height: "2vw",
    },
    [theme.breakpoints.down("md")]: {
        width: "8vw",
        height: "8vw",
    },
    color: projectTheme
}))