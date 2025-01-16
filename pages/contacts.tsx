import React from "react";
import { Box, Typography } from "@mui/material";

const Contacts = () => {
  return (
    <Box
      sx={{
        maxWidth: "1400px",
        margin: "0 auto",
        padding: "2rem",
        display: "flex",
        gap: "2rem",
      }}
    >
      {/* Левая часть - Изображение */}
      <Box sx={{ flex: 1 }}>
        <img
          src="/images/contact_photo.jpg" // Укажите путь к вашему изображению
          alt="Bathroom"
          style={{ width: "100%", borderRadius: "8px" }}
        />
      </Box>

      {/* Правая часть - Информация */}
      <Box sx={{ flex: 1 }}>
        <Typography
          variant="h4"
          sx={{ color: "#008c99", fontWeight: "bold", marginBottom: "1rem" }}
        >
          ГРАФІК РОБОТИ CALL-CENTER
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "18px", marginBottom: "0.5rem" }}
        >
          Вт-Вс: 09:00 - 20:00
        </Typography>
        <Typography
          variant="body1"
          sx={{ fontSize: "18px", marginBottom: "0.5rem" }}
        >
          Вихідний: Понеділок
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            marginBottom: "2rem",
          }}
        >
          <Typography sx={{ fontSize: "40px", color: "#008c99" }}>📞</Typography>
          <Typography sx={{ fontSize: "40px", color: "#008c99" }}>📞</Typography>
        </Box>

        <Typography
          variant="body1"
          sx={{ fontSize: "16px", textAlign: "center", marginBottom: "1rem" }}
        >
          Слідкуйте за нами в соціальних мережах
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "center", gap: "1rem" }}>
          <Typography sx={{ fontSize: "30px", color: "#008c99" }}>📸</Typography>
          <Typography sx={{ fontSize: "30px", color: "#008c99" }}>✈️</Typography>
          <Typography sx={{ fontSize: "30px", color: "#008c99" }}>📞</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;

