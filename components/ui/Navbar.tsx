// components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import React, { FC, useState, useEffect, useRef, KeyboardEvent } from "react";
import { styled, useTheme } from "@mui/material/styles";
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
  Paper
} from "@mui/material";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from "@/context/CartContext";
import { useRouter } from "next/navigation";

// Styled components for search
const SearchContainer = styled("div")({
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

const SuggestionsContainer = styled(Paper)({
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: 9999,
  maxHeight: "200px",
  overflowY: "auto",
  backgroundColor: "#ffffff",
  border: "1px solid #ccc",
  marginTop: "4px",
});

const BurgerMenuHeader = styled("div")({
  display: "flex",
  alignItems: "center",
  padding: "16px",
  backgroundColor: "#f5f5f5",
  borderBottom: "1px solid #ddd",
  fontSize: "24px",
});

const BurgerMenuLogo = styled(Image)({
  height: "40px",
  width: "120px",
  marginRight: "16px",
});

const BurgerMenuContainer = styled(Box)({
  width: 250,
  backgroundColor: "#f5f5f5",
  height: "100%",
  display: "flex",
  flexDirection: "column",
});

type NavbarProps = Record<string, never>;

const Navbar: FC<NavbarProps> = () => {
  // Drawer state
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  // Language switcher
  const [selectedLanguage, setSelectedLanguage] = useState<"UA" | "EN">("UA");

  // Search suggestions state
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isMedium = useMediaQuery("(max-width: 1150px)");

  const { getTotalItems } = useCart();

  const toggleDrawer = (open: boolean): void => {
    setDrawerOpen(open);
  };

  const handleLanguageChange = (language: "UA" | "EN"): void => {
    setSelectedLanguage(language);
  };

  // Hide suggestions if clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch suggestions from API whenever searchValue changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchValue.trim().length === 0) {
        setSuggestions([]);
        return;
      }
      try {
        const res = await fetch(`/api/search?query=${encodeURIComponent(searchValue)}`);
        if (res.ok) {
          const data = await res.json();
          setSuggestions(data);
        }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };

    fetchSuggestions();
  }, [searchValue]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    setShowSuggestions(true);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      router.push(`/productDetails/${suggestions[0].slug}`);
      // Reset search state after navigating
      setSearchValue("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/productDetails/${slug}`);
    // Reset search state after clicking a suggestion
    setSearchValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* Drawer for Mobile Menu */}
      <Drawer anchor="left" open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <BurgerMenuContainer>
          <Link href="/">
            <BurgerMenuHeader>
              <BurgerMenuLogo src="/icons/logo.svg" alt="logo" width={120} height={40} />
            </BurgerMenuHeader>
          </Link>
          <Divider />
          <List>
            <ListItem disablePadding>
              <Link href="/basket">
                <ListItemButton>
                  <ListItemIcon>
                    <ShoppingCartIcon sx={{ color: "#008c99" }} />
                  </ListItemIcon>
                  <ListItemText primary="Кошик" />
                </ListItemButton>
              </Link>
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
              <ListItemButton component={Link} href="/category/wardrobe">
                <ListItemText primary="Шафи" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/category/cabinet">
                <ListItemText primary="ТумбиTest" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/category/mirrors">
                <ListItemText primary="Дзеркала" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/category/waterproof">
                <ListItemText primary="Водонепроникні" />
              </ListItemButton>
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton component={Link} href="/#about" onClick={() => setDrawerOpen(false)}>
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
      {!isMobile && (
        <Box sx={{ backgroundColor: "#008c99", display: "flex", justifyContent: "center", padding: "0.5rem 0" }}>
          <Link href="/#about">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>
              Про нас
            </Typography>
          </Link>
          <Link href="/guarantee">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>
              Гарантія
            </Typography>
          </Link>
          <Link href="/delivery">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>
              Доставка та оплата
            </Typography>
          </Link>
          <Link href="/contacts">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>
              Контакти
            </Typography>
          </Link>
        </Box>
      )}
      <AppBar position="static" elevation={0} sx={{ backgroundColor: "transparent", marginTop: "10px" }}>
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
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "#008c99" }} onClick={() => toggleDrawer(true)}>
              <MenuOutlinedIcon fontSize="large" />
            </IconButton>
            {!isMedium && (
              <Link href="/">
                <Box component="img" src="icons/logo.svg" alt="Logo" sx={{ height: isMobile ? 30 : 40, cursor: "pointer" }} />
              </Link>
            )}
          </Box>
          <Box ref={containerRef} sx={{ position: "relative" }}>
            <SearchContainer>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Пошук"
                value={searchValue}
                onChange={handleSearchChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setShowSuggestions(true)}
              />
            </SearchContainer>
            {showSuggestions && suggestions.length > 0 && (
              <SuggestionsContainer>
                {suggestions.map((item) => (
                  <ListItemButton key={item.slug} onClick={() => handleSuggestionClick(item.slug)}>
                    <ListItemText primary={item.name} />
                  </ListItemButton>
                ))}
              </SuggestionsContainer>
            )}
          </Box>
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
                <Badge badgeContent={getTotalItems()} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Navbar;
