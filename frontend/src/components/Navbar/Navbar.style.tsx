import { Drawer, ListItemText, styled, Toolbar } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import { ThemeContextType } from "../../Types/types";
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import MenuIcon from '@mui/icons-material/Menu';


export const Appbar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== "projectTheme"
})<{projectTheme : ThemeContextType | null}>(({ projectTheme }) => ({
    width : "100vw",
    height : "10vh",
    backgroundColor: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    position : "static",
}))

export const ListIcon = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        width: "3vw",
        height: "3vw",
        marginLeft: "1vw"
    },
    [theme.breakpoints.down("md")]: {
        width: "10vw",
        height: "10vw",
        marginLeft: "5vw",
    },
    color: "#FFFFFF"
}))

export const HeaderText = styled("div")(({ theme }) => ({
    color: "#FFFFFF",
    fontWeight: "500",
    verticalAlign: "middle",
    [theme.breakpoints.up("lg")]: {
        marginLeft: "1vw",
        fontSize: "3rem"
    },
    [theme.breakpoints.down("md")]: {
        marginLeft: "3vw",
        fontSize: "2rem"
    }
}))

export const StyledToolBar = styled(Toolbar)({
    height: "100%",
    padding : "0"
})

export const DrawerIcon = styled(MenuIcon)(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        width: "1.5vw",
        height: "1.5vw",
        marginLeft:"1vw"
    },
    [theme.breakpoints.down("md")]: {
        width: "7vw",
        height: "7vw",
        marginLeft:"3vw",
    },
    cursor: "pointer"
}))

export const ColorChangeIcon = styled(LoyaltyIcon)(({ theme }) => ({
    [theme.breakpoints.up("lg")]: {
        width: "1.5vw",
        height: "1.5vw",
        marginLeft:"1vw"
    },
    [theme.breakpoints.down("md")]: {
        width: "6vw",
        height: "6vw",
        marginLeft:"3vw",
    },
    cursor: "pointer"
}))

export const NavigationDrawer = styled(Drawer)({
    alignItems: "center"
})

export const NavigationOption = styled(ListItemText)(({ theme }) => ({
    fontWeight: "600",
    textAlign: "center",
    [theme.breakpoints.up("lg")]: {
        fontSize: "1.5rem",
        width: "6vw"
    },
    [theme.breakpoints.down("md")]: {
        fontSize: "1rem",
        width: "15vw",
    }
}))
