import React, {useState} from "react";
import { useTheme } from "../../Context/ThemeContext";
import * as S from "./Navbar.style";
import { Drawer, List, ListItemButton, Menu } from "@mui/material";
import { useNavigate } from "react-router-dom"
import { ColorOptions } from "./Navbar.consts";
import { ThemeType } from "../../Context/ThemeContext.types";

const Navbar : React.FC = () => {
    const [open, setOpen] = useState<boolean>(false); 
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const menuOpen = Boolean(anchorEl);

    const openColorMenu = (event: React.MouseEvent<SVGSVGElement>) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };

    const navigationOptions : string[] = ["Classes", "Students", "Create"];

    const {theme, toggleTheme} = useTheme();
    const navigate = useNavigate();

    const openNav = () : void => {
        setOpen(true);
    }

    const closeNav = () : void => {
        setOpen(false);
    }

    const changeTheme = (theme: ThemeType) => {
        toggleTheme(theme);
        handleClose();
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
    });

    const renderedMenuOptions: JSX.Element[] = ColorOptions.map((color) => {
        return (
            <S.ColorItem 
            value={color.hex} 
            onClick={() => changeTheme(color)}
            color={color.hex}>{color.name}</S.ColorItem>
        )
    })

    return (
        <S.Appbar projectTheme={theme.hex}>
            <S.StyledToolBar>
                <S.DrawerIcon onClick={openNav} />
                <S.HeaderText>
                    Shob Classes
                </S.HeaderText>
                <S.ColorChangeIcon onClick = {openColorMenu}/>
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
            <Menu 
                anchorEl={anchorEl}
                open={menuOpen}
                onClose={handleClose}
            >
                {renderedMenuOptions}
            </Menu>
        </S.Appbar>
    )
}

export default Navbar;