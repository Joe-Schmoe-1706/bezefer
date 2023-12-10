import { Card, IconButton, styled } from "@mui/material";
import { ButtonIcon } from "./DeleteIcon.style";

export const ClassCard = styled(Card)({
    width: "12vw",
    height: "19vh",
    fontFamily: "Heebo, sans-serif",
    boxShadow: "0px 4px 4px 0px #00000040"

});

export const ClassName = styled("div")({
    fontSize: "1.5rem",
    fontWeight: "700",
    marginTop: "0.9vh",
    marginLeft: "1vw"
});

export const SeatsLeft = styled("div")({
    fontSize: "1rem",
    fontWeight: "500",
    marginTop: "0.9vh",
    marginLeft: "1vw"
});

export const TotalSeats = styled("div")({
    color: "#8F8F8F",
    fontSize: "0.9rem",
    marginTop: "0.9vh",
    marginLeft: "1vw"
})

export const Footer = styled("footer")({
    display: "flex"
})

export const OpenStudentList = styled("div")({
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1.15rem",
    marginLeft: "0.9vw",
    marginTop: "5vh"
})

export const DeleteClassButton = styled(ButtonIcon)({
    marginTop: "3.75vh",
})