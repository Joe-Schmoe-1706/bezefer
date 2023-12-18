import React from "react";
import { StudentsModalProps } from "./PopupList.types";
import * as S from "./PopupList.style";
import { List, Avatar, ListItem} from "@mui/material";
import { useTheme } from "../../Context/ThemeContext";
import * as DeleteStyle from "../../Style/DeleteIcon.style"

const StudentsModal : React.FC<StudentsModalProps> = ({isOpen, closeModal, items, listType, handleClick}) => {
    const theme = useTheme();

    const avatar = listType === "students" ?
    <S.ProfileIcon /> : 
    <S.StudentIcon />;

    const actionButton = listType === "students" ? 
    <DeleteStyle.CustomDeleteIcon projectTheme={theme} /> :
    <S.PlusIcon projectTheme={theme} />

    const listItems = items.map((item) => {
        return (
        <ListItem>
            <S.ListAvatar>
                <Avatar>
                    {avatar}
                </Avatar>
            </S.ListAvatar>
            <S.Name primary={`${item.firstName} ${item.lastName}`}/>
            <DeleteStyle.ButtonIcon edge="end" onClick={() => handleClick(item._id)}>
                {actionButton}
            </DeleteStyle.ButtonIcon>
        </ListItem>
        )
    })

    return (
        <S.StudentModal open={isOpen} onClose={closeModal} >
            <S.ModalContent>
                <S.ModalHeader>{
                    listType === "students" ?
                    "Class Students" :
                    "Available Classes"    
                }
                </S.ModalHeader>
                <List>
                    {listItems}
                </List>
            </S.ModalContent>
        </S.StudentModal>
    )
}

export default StudentsModal;