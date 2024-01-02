import { styled } from "@mui/material";

export const Container = styled("div")({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignContent: "center"
});

export const ErrorImage = styled("img")(({ theme }) => ({
    [theme.breakpoints.up("sm")]: {
        height: "40vh",
        width: "40vh"
    },
    [theme.breakpoints.down("md")]: {
        height: "25vh",
        width: "25vh"
    },
    marginTop: "12vh",
    alignSelf: "center"
}));

export const ErrorMessage = styled("div")({
    marginTop: "5vh",
    fontSize: "3rem",
    textAlign: "center",
    color: "#F50053"
})