import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

const Contacts = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "0 auto",
          padding: "2rem",
          display: "flex",
          gap: "2rem",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* Левая часть - Изображение */}
        <Box sx={{ flex: 1, width:"" }}>
          <img
            src="/images/contact_photo.jpg" // Укажите путь к вашему изображению
            alt="Bathroom"
            style={{ width: "100%", borderRadius: "8px" }}
          />
        </Box>

        {/* Правая часть - Информация */}
        <Box sx={{ flex: 1, marginLeft:"115px"}}>
          <Typography
            variant="h4"
            sx={{ color: "#008c99", fontWeight: "bold", marginBottom: "50px" }}
          >
            ГРАФІК РОБОТИ CALL-CENTER
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "24px", marginBottom: "25px" }}
          >
            Вт-Вс: 09:00 - 20:00
          </Typography>
          <Typography
            variant="body1"
            sx={{ fontSize: "24px",  marginBottom: "50px" }}
          >
            Вихідний: Понеділок
          </Typography>

          {/* Иконки звонков с номерами */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              margin: "2rem 0",
              gap: "50px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img src="/icons/phone.png" alt="Phone" style={{ width: "40px" }} />
              <Typography variant="body1" sx={{ fontSize: "24px" }}>
                +380-99-22-33-453
              </Typography>
            </Box>
          </Box>

          <Typography
            variant="body1"
            sx={{ fontSize: "16px", marginBottom: "1rem" }}
          >
            Слідкуйте за нами в соціальних мережах
          </Typography>

          {/* Социальные сети */}
          <Box sx={{ display: "flex",  gap: "50px" }}>
            <Link href="https://www.instagram.com" target="_blank">
              <img src="/icons/instagram.png" alt="Instagram" style={{ width: "50px", height:"50px" }} />
            </Link>
            <Link href="https://t.me" target="_blank">
              <img src="/icons/telegram.png" alt="Telegram" style={{  width: "50px", height:"50px" }} />
            </Link>
            <Link href="tel:+380992233453">
              <img src="/icons/viber.png" alt="Viber" style={{ width: "50px", height:"50px" }} />
            </Link>
          </Box>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default Contacts;
