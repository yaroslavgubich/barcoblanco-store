// app/(store)/contacts/page.tsx
"use client";
import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Image from "next/image";
import "@/app/globals.css";

const Contacts = () => {
  return (
    <Box
      sx={{
        maxWidth: "1400px",
        margin: "30px auto",
        padding: "2rem",
        display: "flex",
        gap: "2rem",
        flexDirection: { xs: "column", md: "row" },
        alignItems: { xs: "center", md: "stretch" },
      }}
    >
      {/* Left Section - Image */}
      <Box
        sx={{
          flex: 1,
          width: "100%",
          minWidth: 0,
          display: { xs: "block", md: "block" },
          height: { xs: "300px", md: "455px" },
          position: "relative",
        }}
      >
        <Image
          src="/images/contact_photo.jpg"
          alt="Bathroom"
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: "8px" }}
        />
      </Box>

      {/* Right Section - Information */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          width: "100%",
          marginLeft: { md: "115px", xs: "0" },
          textAlign: { xs: "center", md: "left" },
          maxWidth: { xs: "100%", md: "50%" },
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          height: "100%",
        }}
      >
        <Typography
          variant="h4"
          sx={{ color: "#008c99", fontWeight: "bold", marginBottom: "50px" }}
        >
          ГРАФІК РОБОТИ CALL-CENTER
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            gap: "40px",
          }}
        >
          <Box>
            <Typography
              variant="body1"
              sx={{ fontSize: "24px", marginBottom: "10px" }}
            >
              Вт-Нед:
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "24px" }}>
              Вихідний:
            </Typography>
          </Box>
          <Box>
            <Typography
              variant="body1"
              sx={{
                fontSize: "24px",
                marginBottom: "10px",
                color: "#008c99",
              }}
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

        {/* Контактная информация */}
        <Box
          sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: { xs: "center", md: "flex-start" },
            marginTop: "50px",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              alignItems: { xs: "center", md: "flex-start" },
            }}
          >
            {/* Телефон */}
            <Typography
              variant="body1"
              sx={{ fontSize: "24px" }}
              component="a"
              href="tel:+380666924322"
            >
              +380-66-69-24-322
            </Typography>

            {/* Почта */}
            <Typography
              variant="body1"
              sx={{ fontSize: "24px" }}
              component="a"
              href="mailto:avsdom@ukr.net"
            >
              avsdom@ukr.net
            </Typography>
          </Box>
        </Box>

        {/* Divider */}
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

        {/* Social Media Links */}
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          <Link href="https://www.instagram.com" target="_blank">
            <Image
              src="/icons/instagram.png"
              alt="Instagram"
              width={50}
              height={50}
            />
          </Link>
          <Link href="https://t.me" target="_blank">
            <Image
              src="/icons/telegram.png"
              alt="Telegram"
              width={50}
              height={50}
            />
          </Link>
          <Link href="https://www.viber.com/ua/">
            <Image src="/icons/viber.png" alt="Viber" width={50} height={50} />
          </Link>
        </Box>
      </Box>
    </Box>
  );
};

export default Contacts;

