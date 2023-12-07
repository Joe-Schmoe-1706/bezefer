import { Drawer, ListItemText, styled, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { ThemeContextType } from "../Types/types";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MenuIcon from '@mui/icons-material/Menu';


export const Appbar = styled(MuiAppBar)<{projectTheme : ThemeContextType | null}>(({ projectTheme }) => ({
    width : "100vw",
    height : "10vh",
    backgroundColor: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    position : "static",
}))

export const ListIcon = styled(IconButton)({
    width: "3vw",
    height: "3vw",
    marginLeft: "1vw",
    color: "#FFFFFF"
})

export const HeaderText = styled("div")({
    color: "#FFFFFF",
    fontWeight: "500",
    fontSize: "3rem",
    verticalAlign: "middle",
    marginLeft: "1vw"
});

export const StyledToolBar = styled(Toolbar)({
    height: "100%",
    padding : "0"
})

export const DrawerIcon = styled(MenuIcon)({
    width: "1.5vw",
    height: "1.5vw",
    cursor: "pointer",
    marginLeft:"1vw"
})

export const ColorChangeIcon = styled(LoyaltyIcon)({
    width: "2vw",
    height: "2vw",
    marginLeft : "1vw",
    cursor: "pointer"
})

export const NavigationDrawer = styled(Drawer)({
    alignItems: "center"
})

export const NavigationOption = styled(ListItemText)({
    fontWeight: "600",
    fontSize: "1.5rem",
    width: "7vw",
    paddingLeft : "3vw"
})
