import React, {useState} from "react";
import { useTheme, useUpdateTheme } from "../../Context/ThemeContext";
import * as S from "./Navbar.style";
import { Drawer, List, ListItemButton } from "@mui/material";
import { useNavigate } from "react-router-dom"

const Navbar : React.FC = () => {
    const [open, setOpen] = useState<boolean>(false); 

    const navigationOptions : string[] = ["Classes", "Students", "Create"];

    const theme = useTheme();
    const toggleTheme = useUpdateTheme();
    const navigate = useNavigate();

    const openNav = () : void => {
        setOpen(true);
    }

    const closeNav = () : void => {
        setOpen(false);
    }

    const handleNavigation = (selectedOption : string) : void => {
        setOpen(false);

        if (selectedOption === "Classes") {
            navigate('/')
        } else {
            const path = `/${selectedOption.toLocaleLowerCase()}`
            navigate(path);
        }
    } 

    const renderedNavigationOptions = navigationOptions.map((option) => {
        return (
            <ListItemButton key={option} onClick={() => handleNavigation(option)}>
                <S.NavigationOption primary={option}/>
            </ListItemButton>
        )
    })

    return (
        <S.Appbar projectTheme={theme}>
            <S.StyledToolBar>
                <S.DrawerIcon onClick={openNav} />
                <S.HeaderText>
                    Shob Classes
                </S.HeaderText>
                <S.ColorChangeIcon onClick = {toggleTheme}/>
                <Drawer
                open = {open}
                anchor="left"
                onClose={closeNav}
                >
                    <List>
                        {renderedNavigationOptions}
                    </List>
                </Drawer>
            </S.StyledToolBar>
        </S.Appbar>
    )
}

export default Navbar;