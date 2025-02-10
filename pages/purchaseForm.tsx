import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import Navbar from "../app/components/Navbar";
import Footer from "../app/components/Footer";

const PurchaseForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const payload = {
    to: [formData.email], // Ziel-E-Mail-Adresse
    subject: "Neue Bestellung",       // Betreff
    body: `
      Neue Bestellung erhalten:
      - Name: ${formData.name}
      - Email: ${formData.email}
      - Telefon: ${formData.phone}
      - Adresse: ${formData.address}
    `,
  };
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/email/send-to-customer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Order successfully submitted:", formData);
        alert("Your order has been placed successfully!");
        setFormData({
          name: "",
          email: "",
          phone: "",
          address: "",
        });
      } else {
        const errorData = await response.json();
        console.error("Error submitting order:", errorData);
        alert("An error occurred. Please try again.");
      }
    } catch (error) {
      console.error("Request failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <Box
        sx={{
          maxWidth: "600px",
          margin: "2rem auto",
          padding: "2rem",
          border: "1px solid #008c99",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#008c99",
            marginBottom: "1.5rem",
          }}
        >
          Оформлення замовлення
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Ім'я"
            name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{
              marginBottom: "1.5rem",
              ".MuiInputLabel-root": { color: "#008c99" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#008c99" },
                "&:hover fieldset": { borderColor: "#008c99" },
                "&.Mui-focused fieldset": { borderColor: "#008c99" },
              },
            }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{
              marginBottom: "1.5rem",
              ".MuiInputLabel-root": { color: "#008c99" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#008c99" },
                "&:hover fieldset": { borderColor: "#008c99" },
                "&.Mui-focused fieldset": { borderColor: "#008c99" },
              },
            }}
            required
          />
          <TextField
            fullWidth
            label="Телефон"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            sx={{
              marginBottom: "1.5rem",
              ".MuiInputLabel-root": { color: "#008c99" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#008c99" },
                "&:hover fieldset": { borderColor: "#008c99" },
                "&.Mui-focused fieldset": { borderColor: "#008c99" },
              },
            }}
            required
          />
          <TextField
            fullWidth
            label="Адреса доставки"
            name="address"
            value={formData.address}
            onChange={handleChange}
            sx={{
              marginBottom: "1.5rem",
              ".MuiInputLabel-root": { color: "#008c99" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#008c99" },
                "&:hover fieldset": { borderColor: "#008c99" },
                "&.Mui-focused fieldset": { borderColor: "#008c99" },
              },
            }}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#008c99",
              color: "#fff",
              padding: "0.75rem",
              "&:hover": { backgroundColor: "#007a8a" },
            }}
          >
            Підтвердити замовлення
          </Button>
        </form>
      </Box>
      <Footer />
    </>
  );
};

export default PurchaseForm;
