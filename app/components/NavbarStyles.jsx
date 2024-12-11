import { styled } from "@mui/material/styles";
import Link from "next/link";

export const StyledLink = styled(Link)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: "none",
  fontSize: "1rem",
  fontWeight: "bold",
  "&:hover": {
    textDecoration: "underline",
  },
}));

export const NavLinks = styled("ul")(({ theme }) => ({
  listStyle: "none",
  display: "flex",
  gap: theme.spacing(4),
  margin: 0,
  padding: 0,
  alignItems: "center",
}));

export const NavLinkItem = styled("li")(({ theme }) => ({
  "& a": {
    color: theme.palette.common.white,
    textDecoration: "none",
    fontWeight: 500,
    fontSize: "1rem",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));
