// import React from "react";

// const Navbar: React.FC = () => {
//   return <div>{/* Add your Navbar implementation here */}</div>;
// };

// export default Navbar;

"use client";

import React, { useState } from "react";
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

  useMediaQuery,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

// Type Definitions
type Language = "UA" | "EN";

// Styled Components
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

const BurgerMenuContainer = styled(Box)({
  width: 250,
  backgroundColor: "#f5f5f5",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("UA");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery("(max-width: 1150px)");
  const router = useRouter();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const handleLanguageChange = (language: Language): void => {
    setSelectedLanguage(language);
  };

  return (
    <>
      {/* Drawer Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <BurgerMenuContainer>
          <Box sx={{ padding: "16px" }}>
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                color: "#008c99",
                fontSize: "24px",
              }}
            >
              Контакти
            </Typography>
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
          {/* Logo and Menu Button */}
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
