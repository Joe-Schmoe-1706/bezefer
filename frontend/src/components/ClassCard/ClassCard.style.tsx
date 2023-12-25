import { Card, styled } from "@mui/material";
import { ButtonIcon } from "../../Style/DeleteIcon.style";

export const ClassCard = styled(Card)(({ theme }) => ({
    [theme.breakpoints.only("xl")]: {
        width: "12vw",
        height: "19vh"
    },
    [theme.breakpoints.only("lg")]: {
        width: "20vw",
        height: "22vh"
    },
    [theme.breakpoints.only("md")]: {
        width: "25vw",
        height: "22vh"
    },
    [theme.breakpoints.only("sm")]: {
        width: "35vw",
        height: "20vh",
        marginBottom: "8vh"
    },
    [theme.breakpoints.only("xs")]: {
        width: "55vw",
        height: "25vh",
        marginBottom: "8vh"
    },
    fontFamily: "Heebo, sans-serif",
    boxShadow: "0px 4px 4px 0px #00000040"

}));

export const ClassName = styled("div")(({ theme }) => ({
    [theme.breakpoints.only("xl")]: {
        fontSize: "1.5rem",
    },
    [theme.breakpoints.only("lg")]: {
        fontSize: "2rem",
    },
    [theme.breakpoints.only("md")]: {
        fontSize: "1.5rem",
    },
    [theme.breakpoints.only("sm")]: {
        fontSize: "1.5rem",
    },
    [theme.breakpoints.only("xs")]: {
        fontSize: "1.5rem",
    },
    fontWeight: "700",
    marginTop: "0.9vh",
    marginLeft: "1vw"
}));

export const SeatsLeft = styled("div")(({ theme }) => ({
    fontWeight: "500",
    marginTop: "0.9vh",
    marginLeft: "1vw",
    [theme.breakpoints.only("xl")]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.only("lg")]: {
        fontSize: "1.4rem",
    },
    [theme.breakpoints.only("md")]: {
        fontSize: "1.2rem",
    },
    [theme.breakpoints.only("sm")]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.only("xs")]: {
        fontSize: "1rem",
    },
}));

export const TotalSeats = styled("div")(({ theme }) => ({
    color: "#8F8F8F",
    marginTop: "0.9vh",
    marginLeft: "1vw",
    [theme.breakpoints.only("xl")]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.only("lg")]: {
        fontSize: "1.4rem",
    },
    [theme.breakpoints.only("md")]: {
        fontSize: "1.2rem",
    },
    [theme.breakpoints.only("sm")]: {
        fontSize: "1rem",
    },
    [theme.breakpoints.only("xs")]: {
        fontSize: "1rem",
    },
}))

export const Footer = styled("footer")({
    display: "flex"
})

export const OpenStudentList = styled("div")(({ theme }) => ({
    cursor: "pointer",
    fontWeight: "600",
    marginLeft: "0.9vw",
    marginTop: "5vh",
    [theme.breakpoints.only("xl")]: {
        fontSize: "1.15rem"
    },
    [theme.breakpoints.only("lg")]: {
        fontSize: "1.6rem",
    },
    [theme.breakpoints.only("md")]: {
        fontSize: "1.4rem",
    },
    [theme.breakpoints.only("sm")]: {
        fontSize: "1.15rem"
    },
    [theme.breakpoints.only("xs")]: {
        fontSize: "1.15rem"
    },
}))

export const DeleteClassButton = styled(ButtonIcon)({
    marginTop: "3.75vh",
})