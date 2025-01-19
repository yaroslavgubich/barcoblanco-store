"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import CallButton from "../app/components/CallButton";
import "../app/globals.css";

const DeliverySection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderRadius: "8px",
  marginTop: theme.spacing(3),
  fontFamily: "Roboto, sans-serif",
  textAlign: "center",
}));

const Delivery = () => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <DeliverySection>
          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: "#008c99",
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
            }}
          >
            Доставка та оплата
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontFamily: "Roboto, sans-serif", fontSize: "18px" }}
          >
            Ми пропонуємо швидку та зручну доставку по всій Україні. Ви можете
            обрати найбільш зручний спосіб доставки під час оформлення
            замовлення.
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
              marginBottom: "1.5rem",
            }}
          >
            <strong>Оплата:</strong>
          </Typography>
          <Box
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
              marginBottom: "2rem",
            }}
          >
            LiqPay або по домовленості
          </Box>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
              marginBottom: "1.5rem",
            }}
          >
            <strong>Доставка:</strong>
          </Typography>
          <Box sx={{ fontFamily: "Roboto, sans-serif", fontSize: "18px" }}>
            <div>Доставка по місту</div>
            <div>Нова Пошта</div>
            <div>(Або інші варіанти по домовленості)</div>
          </Box>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
              marginTop: "2rem",
            }}
          >
            Якщо у вас виникли додаткові запитання, зв&apos;яжіться з нами за
            телефоном:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontWeight: "bold",
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
            }}
          >
            +380-66-69-24-322
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{ fontFamily: "Roboto, sans-serif", fontSize: "18px" }}
          >
            або надішліть лист на електронну адресу:
          </Typography>
          <Typography
            variant="body1"
            paragraph
            sx={{
              fontWeight: "bold",
              color: "#008c99",
              fontFamily: "Roboto, sans-serif",
              fontSize: "18px",
            }}
          >
            barcoblanco@ukr.net
          </Typography>
        </DeliverySection>
      </Container>
      <CallButton />
      <Footer />
    </>
  );
};

export default Delivery;
