const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Transporter für E-Mail-Versand konfigurieren
const transporter = nodemailer.createTransport({
  service: 'gmail', // Beispiel mit Gmail; du kannst andere Anbieter verwenden
  auth: {
    user: 'barcoblancotest@gmail.com', // Deine E-Mail-Adresse
    pass: 'barcoblancotest2025',         // Dein Passwort oder App-Passwort
  },
});

// API-Route für E-Mail-Versand
app.post('/api/sendOrder', async (req, res) => {
  const { name, email, orderDetails } = req.body;

  try {
    // Bestätigungs-E-Mail an den Kunden
    await transporter.sendMail({
      from: 'barcoblancotest@gmail.com',
      to: email,
      subject: 'Bestellbestätigung',
      text: `Hallo ${name},\n\nVielen Dank für Ihre Bestellung!\n\nDetails:\n${orderDetails}`,
    });

    // E-Mail an Lagermitarbeiter
    await transporter.sendMail({
      from: 'barcoblancotest@gmail.com',
      to: 'lager-email@example.com', // Lager-Mitarbeiter-Adresse
      subject: 'Neue Bestellung',
      text: `Neue Bestellung von ${name}:\n\n${orderDetails}`,
    });

    res.status(200).send('E-Mails erfolgreich gesendet!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Fehler beim Senden der E-Mails.');
  }
});

app.listen(3000, () => {
  console.log('Server läuft auf http://localhost:3000');
});
