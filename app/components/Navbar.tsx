"use client";

import React, { useState } from "react";
import Logo from "../components/Logo";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Badge,
  InputBase,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { StyledLink, NavLinks, NavLinkItem } from "./NavbarStyles";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false); // State to manage Drawer

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    console.log("Search Term:", event.target.value);
  };

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const cartItems = 1;

  return (
    <AppBar position="static" sx={{ backgroundColor: "#1996a3" }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Menu Icon to toggle Drawer */}
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuOutlinedIcon fontSize="large" />
        </IconButton>

        {/* Drawer */}
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <Box
            sx={{ width: 250 }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
          >
            <List
              sx={{ display: "flex", gap: "20px", flexDirection: "column" }}
            >
              <ListItem
                sx={{
                  display: "flex",
                  justifyContent: "center", // Center horizontally
                  alignItems: "center", // Center vertically
                  padding: "10px",
                  border: "1px solid red", // Optional: Consistent styling with other items
                }}
              >
                <StyledLink
                  href="/"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    textDecoration: "none",
                  }}
                >
                  <HomeIcon sx={{ marginRight: "8px" }} />
                </StyledLink>
              </ListItem>

              {/* Other Menu Items */}
              <ListItem sx={{ border: "1px solid red" }}>
                <StyledLink href="/#footer">Contact Us</StyledLink>
              </ListItem>
              <ListItem sx={{ border: "1px solid red" }}>
                <StyledLink href="/#about">About Us</StyledLink>
              </ListItem>
              <ListItem sx={{ border: "1px solid red" }}>
                <StyledLink href="/#categories">Categories</StyledLink>
              </ListItem>
              <ListItem sx={{ border: "1px solid red" }}>
                <StyledLink href="/#order-call">Order a Call</StyledLink>
              </ListItem>
            </List>
          </Box>
        </Drawer>

        {/* Clickable logo to go home */}
        <Logo />

        {/* Navigation Links */}
        <Box
          component="nav"
          sx={{
            display: {
              xs: "none",
              sm: "flex",
            },
            gap: 2,
          }}
        >
          <StyledLink href="/#categories-section">Categories</StyledLink>
          <StyledLink href="/#about">About Us</StyledLink>
          <StyledLink href="/#footer">Contact Us</StyledLink>
        </Box>

        {/* Search Bar */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: "#ffffff",
            borderRadius: "4px",
            padding: "0 8px",
            width: {
              xs: "50%",
              sm: "30%",
            },
          }}
        >
          <SearchIcon sx={{ color: "gray" }} />
          <InputBase
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchChange}
            sx={{ ml: 1, flex: 1 }}
          />
        </Box>

        {/* Cart Icon */}
        <IconButton edge="end" color="inherit" aria-label="cart">
          <Badge badgeContent={cartItems} color="error">
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
