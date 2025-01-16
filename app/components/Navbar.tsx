"use client";

import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Badge,
} from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import { useRouter } from "next/navigation";

const BurgerMenuHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
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

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const router = useRouter();

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Burger Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <BurgerMenuContainer>
          <BurgerMenuHeader>
            <BurgerMenuLogo src="icons/logo.svg" alt="Логотип" />
          </BurgerMenuHeader>
          <Divider />
          <List>
            <ListItem button onClick={() => scrollToSection("about")}>
              <ListItemText primary="Про нас" />
            </ListItem>
            <ListItem button onClick={() => scrollToSection("guarantee")}>
              <ListItemText primary="Гарантія" />
            </ListItem>
            <ListItem button onClick={() => scrollToSection("delivery")}>
              <ListItemText primary="Доставка та оплата" />
            </ListItem>
            <ListItem button onClick={() => router.push("/contacts")}>
              <ListItemText primary="Контакти" />
            </ListItem>
          </List>
          <Divider />
          <Box sx={{ padding: "16px" }}>
            <Typography variant="body1" sx={{ marginBottom: "8px" }}>
              Контакти
            </Typography>
            <Typography variant="body2">+380-99-22-33-453</Typography>
            <Typography variant="body2">+380-99-22-33-453</Typography>
            <Typography variant="body2" sx={{ marginTop: "16px" }}>
              Пн-Пт: 09:00 - 17:00
            </Typography>
            <Typography variant="body2">Субота: 09:00 - 15:00</Typography>
            <Typography variant="body2">Вихідний: Неділя</Typography>
          </Box>
        </BurgerMenuContainer>
      </Drawer>

      {/* Navigation Bar */}
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
          {/* Logo and Burger Menu */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "#008c99" }} onClick={toggleDrawer(true)}>
              <MenuOutlinedIcon fontSize="large" />
            </IconButton>
          </Box>

          {/* Shopping Cart and Profile */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
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
