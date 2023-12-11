import { Button, Table, TableCell, TableContainer, styled } from "@mui/material";
import { ThemeContextType } from "../../Types/types";

export const StudentTable = styled(Table)({
    width: "70vw",
});

export const StudentTableContainer = styled(TableContainer)({
    width: "70vw",
    boxShadow: "0px 4px 4px 0px #00000040",
    marginLeft: "15vw",
    marginTop: "10vh"
});

export const StyledTableCell = styled(TableCell)({
    textAlign: "center",
    fontSize: "1.1rem"
})

export const DynamicButton = styled(Button)<{projectTheme : ThemeContextType | null}>(({projectTheme}) => ({
    color: projectTheme === "blue" ? "#3F50B5" : "#F50057",
    borderColor:  projectTheme === "blue" ? "#3F50B5" : "#F50057",
    cursor: "pointer"
}))