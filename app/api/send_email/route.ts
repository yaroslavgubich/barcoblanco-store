import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Image from "next/image"

const SMTP_SERVER = "smtp.gmail.com";
const SMTP_PORT = 587;
const SMTP_USERNAME = "barcoblancotest@gmail.com";
const SMTP_PASSWORD = "lkym qujz nwck ploq";
const MANAGER_EMAIL = "barcoblancotest@gmail.com";
//const API_KEY = process.env.API_KEY || "e2801f75-b83a-464a-9b00-f570807ae7a1";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface OrderData {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    cart: OrderItem[];
}

async function sendEmail(toEmail: string, subject: string, htmlBody: string): Promise<void> {
  const transporter = nodemailer.createTransport({
      host: SMTP_SERVER,
      port: SMTP_PORT,
      secure: false,
      auth: {
          user: SMTP_USERNAME,
          pass: SMTP_PASSWORD,
      },
  });

  const mailOptions = {
      from: SMTP_USERNAME,
      to: toEmail,
      subject: subject,
      html: htmlBody, // HTML statt einfachem Text
  };

  await transporter.sendMail(mailOptions);
}

export async function POST(request: Request) {
  try {
      const data: OrderData = await request.json();
      if (!data || !data.cart || data.cart.length === 0) {
          return NextResponse.json({ error: "Invalid data received" }, { status: 400 });
      }

      const totalAmount = data.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

      const customerMessage = `
    <h2 style="color: #333;">Привіт ${data.fullName},</h2>
    <p style="font-size: 16px; color: #555;">Дякуємо за ваше замовлення! Ось його деталі:</p>
    <ul style="font-size: 16px; color: #555;">
        <li><b>👤 Клієнт:</b> ${data.fullName}</li>
        <li><b>📍 Адреса:</b> ${data.address}</li>
        <li><b>🏙 Місто:</b> ${data.city}</li>
        <li><b>💰 Загальна сума:</b> $${totalAmount.toFixed(2)}</li>
    </ul>
    <h3 style="color: #333;">🛍 Деталі замовлення:</h3>
    <table role="presentation" style="width: 800px; border-collapse: collapse; font-size: 16px; color: #333; display: block !important; visibility: visible !important;">
        <thead>
            <tr style="background-color: #f8f8f8;">
                <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Зображення</th>
                <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Назва</th>
                <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Ціна</th>
                <th style="padding: 10px; border-bottom: 2px solid #ddd; text-align: left;">Кількість</th>
            </tr>
        </thead>
        <tbody>
            ${data.cart.map((item, index) => `
                <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9f9f9'};">
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">
                        <img src="${item.image}" alt="${item.name}" width="80" style="border-radius: 8px; display: block;">
                    </td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">$${item.price.toFixed(2)}</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <p style="font-size: 16px; color: #555;">Ми починаємо обробку вашого замовлення і скоро зв’яжемося з вами для підтвердження.</p>
`;


      await sendEmail(data.email, "Підтвердження замовлення", customerMessage);

      // HTML-Template für den Manager
      const managerMessage = `
          <h2>🔔 НОВЕ ЗАМОВЛЕННЯ 🔔</h2>
          <ul>
              <li><b>👤 Клієнт:</b> ${data.fullName}</li>
              <li><b>📧 Email:</b> ${data.email}</li>
              <li><b>📞 Телефон:</b> ${data.phone}</li>
              <li><b>📍 Адреса:</b> ${data.address}, ${data.city}</li>
              <li><b>💰 Загальна сума:</b> $${totalAmount.toFixed(2)}</li>
          </ul>
          <h3>🛍 Деталі замовлення:</h3>
          <table border="1" cellpadding="10" cellspacing="0" width="100%">
              <thead>
                  <tr>
                      <th>Зображення</th>
                      <th>Назва</th>
                      <th>Ціна</th>
                      <th>Кількість</th>
                  </tr>
              </thead>
              <tbody>
                  ${data.cart.map(item => `
                      <tr>
                          <td><img src="${item.image}" alt="${item.name}" width="100"></td>
                          <td>${item.name}</td>
                          <td>$${item.price.toFixed(2)}</td>
                          <td>${item.quantity}</td>
                      </tr>
                  `).join('')}
              </tbody>
          </table>
      `;

      await sendEmail(MANAGER_EMAIL, "Нове замовлення отримано", managerMessage);

      return NextResponse.json({ message: "Замовлення оброблено, електронні листи надіслано" }, { status: 200 });
  } catch (error) {
      return NextResponse.json({ error: "Fehler beim Senden der E-Mail", details: (error as Error).message }, { status: 500 });
  }
}

export async function GET() {
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
