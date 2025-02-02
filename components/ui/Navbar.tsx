"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  InputBase,
  Badge,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";

// Styled components
const Search = styled("div")({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "transparent",
  marginLeft: 0,
  marginRight: "16px",
  width: "535px",
  border: "1px solid #008c99",
  display: "flex",
  alignItems: "center",
  padding: "4px 8px",
});

const SearchIconWrapper = styled("div")({
  color: "#008c99",
  marginRight: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const StyledInputBase = styled(InputBase)({
  color: "#008c99",
  flexGrow: 1,
  border: "none",
  outline: "none",
  fontSize: "16px",
  backgroundColor: "transparent",
  "& .MuiInputBase-input": {
    padding: "8px",
    width: "100%",
  },
});

const BurgerMenuHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
  fontSize: "24px",
});

const BurgerMenuLogo = styled("img")({
  height: "40px",
  marginRight: "16px",
});

const BurgerMenuContainer = styled(Box)({
  width: 250,
  backgroundColor: "#f5f5f5",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

// Type for Navbar props
type NavbarProps = Record<string, never>;

const Navbar: FC<NavbarProps> = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"UA" | "EN">("UA");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery("(max-width: 1150px)");

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open);
  };

  const handleLanguageChange = (language: "UA" | "EN"): void => {
    setSelectedLanguage(language);
  };

  return (
    <>
      {/* Drawer for Mobile Menu */}
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => toggleDrawer(false)}
      >
        <BurgerMenuContainer>
          <BurgerMenuHeader>
            <BurgerMenuLogo src="icons/logo.svg" alt="Логотип" />
          </BurgerMenuHeader>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <ShoppingCartIcon sx={{ color: "#008c99" }} />
                </ListItemIcon>
                <ListItemText primary="Кошик" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <PersonIcon sx={{ color: "#008c99" }} />
                </ListItemIcon>
                <ListItemText primary="Особистий кабінет" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <Typography
              variant="body1"
              sx={{
                padding: "16px 16px 8px",
                fontWeight: "bold",
                color: "#008c99",
                fontSize: "24px",
              }}
            >
              Каталог
            </Typography>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Тумби" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Шафи" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemText primary="Дзеркала" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="#about">
                <ListItemText primary="Про нас" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/guarantee">
                <ListItemText primary="Гарантія" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/delivery">
                <ListItemText primary="Доставка та оплата" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/contacts">
                <ListItemText primary="Контакти" />
              </ListItemButton>
            </ListItem>
          </List>
        </BurgerMenuContainer>
      </Drawer>

      {/* Top Bar for Desktop */}
      {!isMobile && (
        <Box
          sx={{
            backgroundColor: "#008c99",
            display: "flex",
            justifyContent: "center",
            padding: "0.5rem 0",
          }}
        >
          <Link href="#about">
            <Typography
              sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}
            >
              Про нас
            </Typography>
          </Link>
          <Link href="/guarantee">
            <Typography
              sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}
            >
              Гарантія
            </Typography>
          </Link>
          <Link href="/delivery">
            <Typography
              sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}
            >
              Доставка та оплата
            </Typography>
          </Link>
          <Link href="/contacts">
            <Typography
              sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}
            >
              Контакти
            </Typography>
          </Link>
        </Box>
      )}

      {/* Main Navigation */}
      <AppBar
        position="static"
        elevation={0}
        sx={{ backgroundColor: "transparent", marginTop: "10px" }}
      >
        <Toolbar
          sx={{
            maxWidth: "1400px",
            width: "100%",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 1rem",
          }}
        >
          {/* Logo and Menu Button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton
              sx={{ color: "#008c99" }}
              onClick={() => toggleDrawer(true)}
            >
              <MenuOutlinedIcon fontSize="large" />
            </IconButton>
            {!isMedium && (
              <Link href="/">
                <Box
                  component="img"
                  src="icons/logo.svg"
                  alt="Логотип"
                  sx={{ height: isMobile ? 30 : 40, cursor: "pointer" }}
                />
              </Link>
            )}
          </Box>

          {/* Search Bar */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Пошук"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Language Switcher and Icons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Typography
              sx={{
                color: selectedLanguage === "UA" ? "#008c99" : "#ccc",
                cursor: "pointer",
                fontWeight: selectedLanguage === "UA" ? "bold" : "normal",
              }}
              onClick={() => handleLanguageChange("UA")}
            >
              UA
            </Typography>
            <Typography sx={{ color: "#008c99", cursor: "default" }}>
              |
            </Typography>
            <Typography
              sx={{
                color: selectedLanguage === "EN" ? "#008c99" : "#ccc",
                cursor: "pointer",
                fontWeight: selectedLanguage === "EN" ? "bold" : "normal",
              }}
              onClick={() => handleLanguageChange("EN")}
            >
              EN
            </Typography>
            <Link href="/basket">
              <IconButton sx={{ color: "#008c99" }}>
                <Badge badgeContent={4} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
            <IconButton sx={{ color: "#008c99" }}>
              <PersonIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
