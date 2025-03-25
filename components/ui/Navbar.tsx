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

const SearchContainer = styled(Box)(({ theme }) => ({
  position: "relative",
  borderRadius: "20px",
  backgroundColor: "transparent",
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

const Navbar: FC = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<"UA" | "EN">("UA");
  const [searchValue, setSearchValue] = useState("");
  const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { getTotalItems } = useCart();

  const toggleDrawer = (open: boolean) => setDrawerOpen(open);
  const handleLanguageChange = (lang: "UA" | "EN") => setSelectedLanguage(lang);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
        setIsSearchOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchValue.trim()) {
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
        console.error("Search error:", error);
      }
    };
    fetchSuggestions();
  }, [searchValue]);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && suggestions.length > 0) {
      router.push(`/productDetails/${suggestions[0].slug}`);
      setSearchValue("");
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (slug: string) => {
    router.push(`/productDetails/${slug}`);
    setSearchValue("");
    setSuggestions([]);
    setShowSuggestions(false);
  };

  return (
    <>
      {/* Верхняя строка для десктопа */}
      {!isMobile && (
        <Box sx={{ backgroundColor: "#008c99", display: "flex", justifyContent: "center", padding: "0.5rem 0" }}>
          <Link href="/">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>Головна</Typography>
          </Link>
          <Link href="/products">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>Каталог</Typography>
          </Link>
          <Link href="/guarantee">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>Гарантія</Typography>
          </Link>
          <Link href="/delivery">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>Доставка та оплата</Typography>
          </Link>
          <Link href="/contacts">
            <Typography sx={{ cursor: "pointer", color: "#fff", margin: "0 1rem" }}>Контакти</Typography>
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
            gap: "12px",
            flexWrap: "nowrap",
          }}
        >
          {/* Left: Logo & Burger */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "#008c99" }} onClick={() => toggleDrawer(true)}>
              <MenuOutlinedIcon fontSize="large" />
            </IconButton>
            <Link href="/">
              <Box component="img" src="/icons/logo.svg" alt="Logo" sx={{ height: 40, cursor: "pointer" }} />
            </Link>
          </Box>

          {/* Center: Search */}
          {!isMobile ? (
            <Box ref={containerRef} sx={{ position: "relative", flex: 1 }}>
              <SearchContainer>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Пошук"
                  value={searchValue}
                  onChange={(e) => {
                    setSearchValue(e.target.value);
                    setShowSuggestions(true);
                  }}
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
          ) : (
            <Box sx={{ position: "relative" }}>
              <IconButton onClick={() => setIsSearchOpen(!isSearchOpen)}>
                <SearchIcon sx={{ color: "#008c99" }} />
              </IconButton>
              {isSearchOpen && (
                <Box
                  sx={{
                    position: "absolute",
                    top: "40px",
                    right: 0,
                    width: "100vw",
                    backgroundColor: "#fff",
                    padding: "8px 16px",
                    boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
                    zIndex: 999,
                  }}
                  ref={containerRef}
                >
                  <SearchContainer sx={{ width: "100%" }}>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Пошук"
                      value={searchValue}
                      onChange={(e) => {
                        setSearchValue(e.target.value);
                        setShowSuggestions(true);
                      }}
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
              )}
            </Box>
          )}

          {/* Right: Language & Cart */}
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
            <Typography sx={{ color: "#008c99", cursor: "default" }}>|</Typography>
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
