import React from "react";
import { StudentsModalProps } from "./PopupList.types";
import * as S from "./PopupList.style";
import { List, Avatar, ListItem} from "@mui/material";
import { useTheme } from "../../Context/ThemeContext";
import * as DeleteStyle from "../../Style/DeleteIcon.style"

const StudentsModal : React.FC<StudentsModalProps> = ({
    isOpen,
    closeModal,
    items,
    handleClick,
    header,
    actionIcon,
    avatar,
    errorMessage
}) => {
    const theme = useTheme();

    const listItems = items.map((item) => {
        return (
        <ListItem>
            <S.ListAvatar>
                <Avatar>
                    {avatar}
                </Avatar>
            </S.ListAvatar>
            <S.Name>{item.text}</S.Name>
            <DeleteStyle.ButtonIcon projectTheme={theme} edge="end" onClick={() => handleClick(item._id)}>
                {actionIcon}
            </DeleteStyle.ButtonIcon>
        </ListItem>
        )
    })

    if (items.length === 0) {
        return (
            <S.StudentModal open={isOpen} onClose={closeModal}>
                <S.ErrorContent>
                    <S.ErrorModalHeader>
                        {errorMessage}
                    </S.ErrorModalHeader>
                </S.ErrorContent>
            </S.StudentModal>
        )
    }

    return (
        <S.StudentModal open={isOpen} onClose={closeModal} >
            <S.ModalContent>
                <S.ModalHeader>{
                    header  
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