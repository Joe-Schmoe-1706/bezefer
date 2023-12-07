import React, {useState} from "react";
import { useTheme, useUpdateTheme } from "../Context/ThemeContext";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MenuIcon from '@mui/icons-material/Menu';
import * as S from "./NavbarStyle";
import { Toolbar } from "@mui/material";

const Navbar : React.FC = () => {
    const [open, setOpen] = useState<boolean>(false); 

    const navigationOptions : string[] = [""];

    const theme = useTheme();
    const toggleTheme = useUpdateTheme();

    return (
        <S.Appbar projectTheme={theme}>
            <S.StyledToolBar>
                <S.DrawerIcon />
                <S.HeaderText>
                    Shob Classes
                </S.HeaderText>
                <S.ColorChangeIcon onClick = {toggleTheme}/>
            </S.StyledToolBar>
        </S.Appbar>
    )
}

export default Navbar;