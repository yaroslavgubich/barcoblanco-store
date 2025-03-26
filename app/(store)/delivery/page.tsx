// app/(store)/delivery/page.tsx
"use client";
import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import "@/app/globals.css";

const DeliverySection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(1),
  borderRadius: "8px",
  marginTop: theme.spacing(1),
  fontFamily: "Roboto, sans-serif",
  textAlign: "center",
}));

const Delivery = () => {
  return (
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
          обрати найбільш зручний спосіб доставки під час оформлення замовлення.
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
            color: "#008c99",
            "&:hover": {
              color: "#005f69",
            },
          }}
        >
          <a
            href="tel:+380666924322"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            +380-66-69-24-322
          </a>
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
            "&:hover": {
              color: "#005f69",
            },
          }}
        >
          <a
            href="mailto:barcoblanco@ukr.net"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            barcoblanco@ukr.net
          </a>
        </Typography>

      </DeliverySection>
    </Container>
  );
};

export default Delivery;
