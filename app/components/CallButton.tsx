"use client";

import React from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import PhoneIcon from "@mui/icons-material/Phone";

const FloatingButton = styled(IconButton)(({ theme }) => ({
  position: "fixed",
  bottom: "20px",
  right: "30px",
  backgroundColor: "#008c99",
  color: "#fff",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  width: "60px",
  height: "60px",
  borderRadius: "50%",
  zIndex: 1000,
  transition: "transform 0.3s ease, background-color 0.3s ease",
  "&:hover": {
    backgroundColor: "#007387",
    transform: "scale(1.1)",
  },
  "@keyframes float": {
    "0%": {
      transform: "translateY(0px)",
    },
    "50%": {
      transform: "translateY(-5px)",
    },
    "100%": {
      transform: "translateY(0px)",
    },
  },
  animation: "float 2s infinite",
  [theme.breakpoints.down("sm")]: {
    width: "50px",
    height: "50px",
    bottom: "15px",
    right: "15px",
  },
  [theme.breakpoints.down("xs")]: {
    width: "40px",
    height: "40px",
    bottom: "10px",
    right: "10px",
  },
}));

const CallButton = () => {
  const handleCall = () => {
    window.location.href = "tel:+380666924322";
  };

  return (
    <FloatingButton onClick={handleCall} aria-label="Call">
      <PhoneIcon fontSize="large" />
    </FloatingButton>
  );
};

export default CallButton;
