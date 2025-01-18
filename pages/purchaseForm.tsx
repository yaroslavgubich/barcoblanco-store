import React, { useState } from "react";
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Your order has been placed successfully!");
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
          sx={{ textAlign: "center", color: "#008c99", marginBottom: "1.5rem" }}
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
            sx={{ marginBottom: "1.5rem", ".MuiInputLabel-root": { color: "#008c99" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#008c99" }, "&:hover fieldset": { borderColor: "#008c99" }, "&.Mui-focused fieldset": { borderColor: "#008c99" } } }}
            required
          />
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            sx={{ marginBottom: "1.5rem", ".MuiInputLabel-root": { color: "#008c99" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#008c99" }, "&:hover fieldset": { borderColor: "#008c99" }, "&.Mui-focused fieldset": { borderColor: "#008c99" } } }}
            required
          />
          <TextField
            fullWidth
            label="Телефон"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={handleChange}
            sx={{ marginBottom: "1.5rem", ".MuiInputLabel-root": { color: "#008c99" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#008c99" }, "&:hover fieldset": { borderColor: "#008c99" }, "&.Mui-focused fieldset": { borderColor: "#008c99" } } }}
            required
          />
          <TextField
            fullWidth
            label="Адреса доставки"
            name="address"
            value={formData.address}
            onChange={handleChange}
            sx={{ marginBottom: "1.5rem", ".MuiInputLabel-root": { color: "#008c99" }, "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#008c99" }, "&:hover fieldset": { borderColor: "#008c99" }, "&.Mui-focused fieldset": { borderColor: "#008c99" } } }}
            required
          />
          <Button
            fullWidth
            type="submit"
            variant="contained"
            sx={{ backgroundColor: "#008c99", color: "#fff", padding: "0.75rem", "&:hover": { backgroundColor: "#007a8a" } }}
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
