import React, { useState } from "react";
import { Box, Typography, TextField, Button, Snackbar, Alert } from "@mui/material";

const OrderForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    orderDetails: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/sendOrder", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSnackbarMessage("Bestellbestätigung wurde gesendet!");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Fehler beim Senden der Bestellung.");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      setSnackbarMessage("Ein unerwarteter Fehler ist aufgetreten.");
      setSnackbarSeverity("error");
    } finally {
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        maxWidth: "800px",
        margin: "50px auto",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
        textAlign: "center",
      }}
    >
      <Typography variant="h4" sx={{ marginBottom: "1.5rem", color: "#008c99" }}>
        Bestellung abschicken
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          fullWidth
          type="email"
          label="E-Mail"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: "1rem" }}
        />
        <TextField
          fullWidth
          multiline
          rows={4}
          label="Bestelldetails"
          name="orderDetails"
          value={formData.orderDetails}
          onChange={handleInputChange}
          required
          sx={{ marginBottom: "1.5rem" }}
        />
        <Button type="submit" variant="contained" sx={{ backgroundColor: "#008c99", color: "#fff" }}>
          Bestellung abschicken
        </Button>
      </form>

      {/* Snackbar für Feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default OrderForm;
