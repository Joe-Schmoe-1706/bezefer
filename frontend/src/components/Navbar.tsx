import React, {useState} from "react";
import { useTheme, useUpdateTheme } from "../Context/ThemeContext";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MenuIcon from '@mui/icons-material/Menu';
import * as S from "./NavbarStyle";
import { Drawer, List, ListItemButton, ListItemText, Toolbar } from "@mui/material";

const Navbar : React.FC = () => {
    const [open, setOpen] = useState<boolean>(false); 

    const navigationOptions : string[] = ["Classes", "Students", "Create"];

    const theme = useTheme();
    const toggleTheme = useUpdateTheme();

    const renderedNavigationOptions = navigationOptions.map((option) => {
        return (
            <ListItemButton key={option}>
                <S.NavigationOption primary={option}/>
            </ListItemButton>
        )
    })

    const openNav = () => {
        setOpen(true);
    }

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