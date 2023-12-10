import React from "react";
import { StudentsModalProps } from "../Types/types";
import * as S from "./StudentsModal.style";
import { List, Avatar, ListItem} from "@mui/material";
import { useTheme } from "../Context/ThemeContext";
import * as DeleteStyle from "./DeleteIcon.style"

const StudentsModal : React.FC<StudentsModalProps> = ({isOpen, closeModal }) => {
    const theme = useTheme();

    return (
        <S.StudentModal open={isOpen} onClose={closeModal} >
            <S.ModalContent>
                <S.ModalHeader>Class Students</S.ModalHeader>
                <List>
                    <ListItem>
                        <S.ListAvatar>
                            <Avatar>
                                <S.ProfileIcon></S.ProfileIcon>
                            </Avatar>
                        </S.ListAvatar>
                        <S.StudentName primary="מתן גוךדברג"/>
                        <DeleteStyle.DeleteButton edge="end">
                            <DeleteStyle.CustomDeleteIcon projectTheme={theme}></DeleteStyle.CustomDeleteIcon>
                        </DeleteStyle.DeleteButton>
                    </ListItem>
                    {/* <ListItem>
                        <ListItemAvatar>
                            <Avatar>
                                <S.ProfileIcon></S.ProfileIcon>
                            </Avatar>
                        </ListItemAvatar>
                        <S.StudentName primary="פיונה פנג"/>
                        <DeleteStyle.DeleteButton edge="end">
                            <DeleteStyle.CustomDeleteIcon projectTheme={theme}></DeleteStyle.CustomDeleteIcon>
                        </DeleteStyle.DeleteButton>
                    </ListItem> */}
                </List>
            </S.ModalContent>
        </S.StudentModal>
    )
}

export default StudentsModal;