const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "https://barcoblanco-dev.vercel.app"  // Ersetze durch deine Frontend-Domain
}));
app.use(express.json());

// SMTP-Konfiguration für Nodemailer
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

// API-Key Überprüfung Middleware
const checkApiKey = (req, res, next) => {
    const apiKey = req.headers["x-api-key"];
    if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(403).json({ error: "Ungültiger oder fehlender API-Key" });
    }
    next();
};

// E-Mail senden Funktion
const sendEmail = async (toEmail, subject, body) => {
    try {
        await transporter.sendMail({
            from: `"Barcoblanco" <${process.env.SMTP_USERNAME}>`,
            to: toEmail,
            subject: subject,
            text: body,
        });
    } catch (error) {
        console.error("Fehler beim Senden der E-Mail:", error);
        throw new Error("E-Mail konnte nicht gesendet werden.");
    }
};

// POST /api/send-order
app.post("/api/send-order", checkApiKey, async (req, res) => {
    const data = req.body;
    if (!data) {
        return res.status(400).json({ error: "No data received" });
    }

    try {
        const totalAmount = data.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        // E-Mail an den Kunden
        const customerMessage = `
            Привіт ${data.fullName},

            Дякуємо за ваше замовлення! Ось його деталі:

            👤 Клієнт: ${data.fullName}
            📍 Адреса: ${data.address}
            🏙 Місто: ${data.city}
            💰 Загальна сума: $${totalAmount}
            🛍 Деталі замовлення:
            ${JSON.stringify(data.cart, null, 2)}

            Ми починаємо обробку вашого замовлення і скоро зв’яжемося з вами для підтвердження.
            Якщо у вас є будь-які питання, не соромтеся звертатися.

            З найкращими побажаннями,
            Ваша команда Barcoblanco
        `;
        await sendEmail(data.email, "Підтвердження замовлення", customerMessage);

        // E-Mail an den Manager
        const managerMessage = `
            🔔 НОВЕ ЗАМОВЛЕННЯ 🔔

            👤 Клієнт: ${data.fullName}
            📧 Email: ${data.email}
            📞 Телефон: ${data.phone}
            📍 Адреса: ${data.address}, ${data.city}
            💰 Загальна сума: $${totalAmount}

            🛍 Деталі замовлення:
            ${JSON.stringify(data.cart, null, 2)}

            Будь ласка, перевірте та підтвердіть замовлення якомога швидше.
        `;
        await sendEmail(process.env.MANAGER_EMAIL, "Нове замовлення отримано", managerMessage);

        res.status(200).json({ message: "Замовлення оброблено, електронні листи надіслано" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Fehler beim Verarbeiten der Bestellung" });
    }
});

// GET /api/test
app.get("/api/test", (req, res) => {
    res.status(200).json({ message: "Success" });
});

app.listen(PORT, () => {
    console.log(`Server läuft auf http://localhost:${PORT}`);
});
