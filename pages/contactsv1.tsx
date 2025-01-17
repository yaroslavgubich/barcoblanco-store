import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import "../app/globals.css"

const Contacts = () => {
  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "1400px",
          margin: "50px auto",
          padding: "2rem",
          display: "flex",
          gap: "2rem",
          flexDirection: { xs: "column", md: "row" },
          alignItems: { xs: "center", md: "flex-start" },
        }}
      >
        {/* Левая часть - Изображение */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            textAlign: "center",
            marginBottom: { xs: "2rem", md: "0" },
            display: { xs: "none", md: "block" },
            height: "auto", // Поддержка высоты изображения
          }}
        >
          <img
            src="/images/contact_photo.jpg" // Укажите путь к вашему изображению
            alt="Bathroom"
            style={{ maxWidth: "100%", height: "100%", borderRadius: "8px" }}
          />
        </Box>

        {/* Правая часть - Информация */}
        <Box
          sx={{
            flex: 1,
            marginLeft: { md: "115px", xs: "0" },
            textAlign: { xs: "center", md: "left" },
            maxWidth: { xs: "90%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%", // Высота информации
          }}
        >
          <Typography
            variant="h4"
            sx={{ color: "#008c99", fontWeight: "bold", marginBottom: "50px" }}
          >
            ГРАФІК РОБОТИ CALL-CENTER
          </Typography>
          <Box sx={{ display: "flex", justifyContent: { xs: "center", md: "flex-start" }, gap: "40px" }}>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "24px", marginBottom: "10px" }}
              >
                Вт-Вс:
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "24px" }}
              >
                Вихідний:
              </Typography>
            </Box>
            <Box>
              <Typography
                variant="body1"
                sx={{ fontSize: "24px", marginBottom: "10px", color: "#008c99" }}
              >
                09:00 - 20:00
              </Typography>
              <Typography
                variant="body1"
                sx={{ fontSize: "24px", color: "#008c99" }}
              >
                Понеділок
              </Typography>
            </Box>
          </Box>

          {/* Иконки звонков с номерами */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: "center",
              marginTop: " 50px",
              gap: "50px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src="/icons/phone.png"
                alt="Phone"
                style={{ height: "30px", width: "30px" }}
              />
              <Typography variant="body1" sx={{ fontSize: "24px" }}>
                +380-99-22-33-453
              </Typography>
            </Box>
          </Box>

          {/* Полоска */}
          <Box
            sx={{
              height: "2px",
              width: "100%",
              backgroundColor: "#008c99",
              margin: "50px 0",
            }}
          ></Box>

          <Typography
            variant="body1"
            sx={{ fontSize: "16px", marginBottom: "1rem" }}
          >
            Слідкуйте за нами в соціальних мережах
          </Typography>

          {/* Социальные сети */}
          <Box sx={{ display: "flex", gap: "20px", justifyContent: { xs: "center", md: "flex-start" } }}>
            <Link href="https://www.instagram.com" target="_blank">
              <img
                src="/icons/instagram.png"
                alt="Instagram"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
            <Link href="https://t.me" target="_blank">
              <img
                src="/icons/telegram.png"
                alt="Telegram"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
            <Link href="tel:+380992233453">
              <img
                src="/icons/viber.png"
                alt="Viber"
                style={{ width: "50px", height: "50px" }}
              />
            </Link>
          </Box>
        </Box>
      </Box>

      <Footer />
    </>
  );
};

export default Contacts;



