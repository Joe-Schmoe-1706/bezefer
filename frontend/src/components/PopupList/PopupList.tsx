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
            <S.Name>{listType === "students" ? `${item.firstName} ${item.lastName}` : item.name}</S.Name>
            <DeleteStyle.ButtonIcon edge="end" onClick={() => handleClick(item._id)}>
                {actionButton}
            </DeleteStyle.ButtonIcon>
        </ListItem>
        )
    })

    if (items.length === 0) {
        return (
            <S.StudentModal open={isOpen} onClose={closeModal}>
                <S.ErrorContent>
                    <S.ErrorModalHeader>
                        {listType === "students" ?
                        "there are no students in this class" :
                        "there aren't available classes"}
                    </S.ErrorModalHeader>
                </S.ErrorContent>
            </S.StudentModal>
        )
    }

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