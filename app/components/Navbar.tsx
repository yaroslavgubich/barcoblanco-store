"use client";

import React, { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
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
  ListItemText,
  Divider,
  useMediaQuery,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

// Type for toggleDrawer parameter
type ToggleDrawerFunction = (open: boolean) => () => void;

// Type for handleLanguageChange parameter
type Language = "UA" | "EN";

// Type for scrollToSection parameter
type SectionId = string;

// Styled components for search and drawer menu
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "transparent",
  marginLeft: 0,
  marginRight: theme.spacing(2),
  width: "535px",
  border: "1px solid #008c99",
  display: "flex",
  alignItems: "center",
  padding: "4px 8px",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  color: "#008c99",
  marginRight: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#008c99",
  flexGrow: 1,
  border: "none",
  outline: "none",
  fontSize: "16px",
  backgroundColor: "transparent",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
  },
}));

const BurgerMenuHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
  fontSize: "24px",
}));

const BurgerMenuLogo = styled("img")({
  height: "40px",
  marginRight: "16px",
});

const BurgerMenuContainer = styled(Box)(({ theme }) => ({
  width: 250,
  backgroundColor: "#f5f5f5",
  height: "100%",
  display: "flex",
  flexDirection: "column",
}));

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("UA");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery("(max-width: 1150px)");
  const router = useRouter();

  const toggleDrawer: ToggleDrawerFunction = (open) => () => {
    setDrawerOpen(open);
  };

  const handleLanguageChange = (language: Language): void => {
    setSelectedLanguage(language);
  };

  const scrollToSection = (id: SectionId): void => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Drawer menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <BurgerMenuContainer>
          <BurgerMenuHeader>
            <BurgerMenuLogo src="icons/logo.svg" alt="Логотип" />
          </BurgerMenuHeader>

          {/* ☢️⚠️❌ BROKEN CODE WARNING ⚠️❌☢️}
          {/* <Divider />
          <List>
            <ListItem button>
              <ShoppingCartIcon sx={{ marginRight: "8px", color: "#008c99" }} />
              <ListItemText primary="Кошик" />
            </ListItem>
            <ListItem button>
              <PersonIcon sx={{ marginRight: "8px", color: "#008c99" }} />
              <ListItemText primary="Особистий кабінет" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <Typography variant="body1" sx={{ padding: "16px 16px 8px", fontWeight: "bold", color: "#008c99", fontSize: "24px" }}>
              Каталог
            </Typography>
            <ListItem button>
              <ListItemText primary="Тумби" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Шафи" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Дзеркала" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button onClick={() => scrollToSection("about")}>
              <ListItemText primary="Про нас" />
            </ListItem>
            <ListItem button onClick={() => router.push("/guarantee")}>
              <ListItemText primary="Гарантія" />
            </ListItem>
            <ListItem button onClick={() => router.push("/delivery")}>
              <ListItemText primary="Доставка та оплата" />
            </ListItem>
            <ListItem button onClick={() => router.push("/contacts")}>
              <ListItemText primary="Контакти" />
            </ListItem>
          </List>
          <Divider /> */}
          <Box sx={{ padding: "16px" }}>
            <Typography
              variant="body1"
              sx={{
                marginBottom: "8px",
                fontWeight: "bold",
                color: "#008c99",
                fontSize: "24px",
              }}
            >
              Контакти
            </Typography>
            <Typography variant="body2">+380-99-22-33-453</Typography>
            <Typography variant="body2">+380-99-22-33-453</Typography>
            <Typography variant="body2" sx={{ marginTop: "16px" }}>
              Вт-Нед: 09:00 - 20:00
            </Typography>
            <Typography variant="body2">Вихідний: Понеділок</Typography>
          </Box>
        </BurgerMenuContainer>
      </Drawer>

      {/* Navbar */}
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
            gap: 2,
          }}
        >
          {/* Logo and menu button */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "#008c99" }} onClick={toggleDrawer(true)}>
              <MenuOutlinedIcon fontSize="large" />
            </IconButton>
            {!isMedium && (
              <Box
                component="img"
                src="icons/logo.svg"
                alt="Логотип"
                sx={{
                  height: isMobile ? 30 : 40,
                  marginLeft: "2rem",
                  cursor: "pointer",
                }}
                onClick={() => router.push("/")}
              />
            )}
          </Box>

          {/* Search */}
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Пошук"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          {/* Language switcher, cart, and profile */}
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
            <IconButton sx={{ color: "#008c99" }}>
              <Badge badgeContent={4} color="error">
                <ShoppingCartIcon />
              </Badge>
            </IconButton>
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
