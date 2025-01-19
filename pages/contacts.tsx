import React from "react";
import { Box, Typography, Link } from "@mui/material";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import CallButton from "../app/components/CallButton";
import Image from "next/image"; // Import the Image component
import "../app/globals.css";

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
        {/* Left Section - Image */}
        <Box
          sx={{
            flex: 1,
            width: "100%",
            textAlign: "center",
            marginBottom: { xs: "2rem", md: "0" },
            display: { xs: "none", md: "block" },
            height: "455px", // Image height
            position: "relative", // Required for Next.js Image
          }}
        >
          <Image
            src="/images/contact_photo.jpg" // Replace with your image path
            alt="Bathroom"
            layout="fill" // Fill the container
            objectFit="cover" // Ensure the image fits correctly
            style={{ borderRadius: "8px" }}
          />
        </Box>

        {/* Right Section - Information */}
        <Box
          sx={{
            flex: 1,
            marginLeft: { md: "115px", xs: "0" },
            textAlign: { xs: "center", md: "left" },
            maxWidth: { xs: "90%", md: "50%" },
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            height: "100%", // Height of the content
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
                Вт-Вс:
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

          {/* Call Icon with Number */}
          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "space-between" },
              alignItems: "center",
              marginTop: "50px",
              gap: "50px",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <Image
                src="/icons/phone.png"
                alt="Phone"
                width={30}
                height={30}
              />
              <Typography variant="body1" sx={{ fontSize: "24px" }}>
                +380-66-69-24-322
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
            <Link href="tel:+380992233453">
              <Image
                src="/icons/viber.png"
                alt="Viber"
                width={50}
                height={50}
              />
            </Link>
          </Box>
        </Box>
      </Box>
      <CallButton />
      <Footer />
    </>
  );
};

export default Contacts;
