"use client";

import React from "react";
import { Box, Typography, Container } from "@mui/material";
import { styled } from "@mui/material/styles";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";
import CallButton from "../app/components/CallButton";
import "../app/globals.css"

const GuaranteeSection = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: "8px",
  marginTop: theme.spacing(4),
  textAlign: "center", // Центрируем текст
  fontFamily: "Roboto, sans-serif", // Устанавливаем шрифт Roboto
}));

const Guarantee = () => {
  return (
    <>
     <Navbar />
    <Container maxWidth="md" sx={{ marginBottom:"70px" }}>
      
      <GuaranteeSection>
        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "#008c99", fontWeight: "bold", textAlign: "center" }}
        >
          Гарантія
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Ми надаємо гарантію на всю нашу продукцію, щоб ви могли бути впевнені в
          її якості. Всі меблі проходять строгий контроль перед відправкою,
          тому ймовірність браку мінімальна.
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Гарантійний термін складає <span style={{ color: '#008c99', fontWeight: 'bold' }}>12 місяців</span> з моменту покупки. Якщо протягом
          цього часу виникнуть будь-які проблеми, пов'язані з якістю або
          дефектами виробництва, ми безкоштовно усунемо їх або замінимо товар.
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Для оформлення гарантійного випадку, будь ласка, зв'яжіться з нашим
          відділом підтримки за телефоном:
        </Typography>
        <Typography 
          variant="body1" 
          paragraph 
          sx={{ fontWeight: "bold", fontSize: "18px" }}
        >
          +380-66-69-24-322
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: "18px" }}
        >
          або надішліть лист на електронну адресу:
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ fontWeight: "bold", color: "#008c99", fontSize: "18px" }}
        >
          barcoblanco@ukr.net
        </Typography>
        <Typography 
          variant="body1" 
          paragraph
          sx={{ fontSize: "18px" }}
        >
          Дякуємо, що обрали нашу продукцію!
        </Typography>
      </GuaranteeSection>
      
    </Container>
    <CallButton/>
    <Footer />
    </>
    
  );
};

export default Guarantee;


