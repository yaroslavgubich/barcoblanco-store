const express = require("express");
const app = express();

app.use(express.json());

app.post("email/send-to-customer", (req: { body: { to: any; subject: any; body: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; }): void; new(): any; }; }; }) => {
  const { to, subject, body } = req.body;

  // Beispiel: Anfrage verarbeiten (z.B. mit einem E-Mail-Service wie Nodemailer)
  console.log("E-Mail-Daten erhalten:");
  console.log("To:", to);
  console.log("Subject:", subject);
  console.log("Body:", body);

  // Simulieren, dass die E-Mail erfolgreich gesendet wurde
  res.status(200).json({ message: "E-Mail erfolgreich gesendet!" });
});

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Server läuft auf http://localhost:${PORT}`);
});
