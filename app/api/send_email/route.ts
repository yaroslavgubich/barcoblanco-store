import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SMTP_SERVER = "smtp.gmail.com";
const SMTP_PORT = 587;
const SMTP_USERNAME = "barcoblancotest@gmail.com";
const SMTP_PASSWORD = "oimq jjxg atqb etmk";
const MANAGER_EMAIL = "barcoblancotest@gmail.com";

interface OrderItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}

type DeliveryMethod = "nova-poshta" | "ukrposhta" | "pickup" | string;

interface OrderData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    addressCourier?: string;
    additionalInfo?: string;
    selectedToggle: "",
    cart: OrderItem[];
    warehouse: string;
    paymentMethods: string;
    deliveryMethod: DeliveryMethod;
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
        html: htmlBody,
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

        const customerMessagePayByAgreement = `
  <h2 style="color: #333;">Привіт ${data.firstName},</h2>
  <p style="font-size: 16px; color: #555;">Дякуємо за ваше замовлення! Ось його деталі:</p>
  <ul style="font-size: 16px; color: #555;">
    ${data.lastName || data.firstName ? `<li><b>Клієнт:</b> ${data.lastName ?? ""} ${data.firstName ?? ""}</li>` : ""}
    ${data.address ? `<li><b>Адреса:</b> ${data.address}</li>` : ""}
    ${data.city ? `<li><b>Місто:</b> ${data.city}</li>` : ""}
    <li><b>Доставка:</b> 
    ${data.deliveryMethod === "pickup" 
      ? "Самовивіз" 
      : data.deliveryMethod === "ukr-poshta" 
        ? "Укр Пошта" 
        : data.deliveryMethod === "nova-poshta" 
          ? "Нова Пошта" 
          : "Не вказано"}
  </li>
  
    ${data.selectedToggle
                ? `<li><b>Вид доставки:</b> ${data.selectedToggle === 'courier' ? "Кур'єром" : data.selectedToggle}</li>`
                : ""
            }
    ${data.warehouse ? `<li><b>Відділення:</b> ${data.warehouse}</li>` : ""}
    ${data.paymentMethods ? `<li><b>Оплата:</b> ${data.paymentMethods}</li>` : ""}
    <li><b>Загальна сума:</b> ${totalAmount.toFixed(2)} грн.</li>
  </ul>

  <h3 style="color: #333;">Деталі замовлення:</h3>
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
      ${data.cart
                .map((item, index) => `
        <tr style="background-color: ${index % 2 === 0 ? '#ffffff' : '#f9f9f9'};">
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            <img src="${item.image}" alt="${item.name}" width="80" style="border-radius: 8px; display: block;">
          </td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.name}</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.price.toFixed(2)} грн.</td>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
        </tr>
      `)
                .join('')}
    </tbody>
  </table>

  <p style="font-size: 16px; color: #555;">
    Наш менеджер зв’яжеться з вами якнайшвидше, щойно почне обробку замовлення.
    <br/>
    Якщо це терміново — зателефонуйте нам за номером <a href="tel:+38 (066) 69-24-322">+38 (066) 69-24-322</a>.
  </p>
`;



        const customerMessage = `
    <h2 style="color: #333;">Привіт ${data.firstName},</h2>
    <p style="font-size: 16px; color: #555;">Дякуємо за ваше замовлення! Ось його деталі:</p>
    <ul style="font-size: 16px; color: #555;">
        <li><b>Клієнт:</b> ${data.lastName} ${data.firstName}</li>
        <li><b>Адреса:</b> ${data.address}</li>
        <li><b>Місто:</b> ${data.city}</li>
        <li><b>Вид доставки:</b> ${data.selectedToggle
                ? (data.selectedToggle === 'courier' ? "Кур'єром" : data.selectedToggle)
                : "Не вказано"}  
        </li>
        <li><b>Відділення:</b> ${data.warehouse}</li>
        <li><b>Оплата:</b> ${data.paymentMethods}</li>
        <li><b>Загальна сума:</b> ${totalAmount.toFixed(2)} грн.</li>
    </ul>
    <h3 style="color: #333;">Деталі замовлення:</h3>
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
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.price.toFixed(2)} грн.</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>

    <p style="font-size: 16px; color: #555;">Ми починаємо обробку вашого замовлення і скоро зв’яжемося з вами для підтвердження.</p>
`;


        await sendEmail(data.email, "Підтвердження замовлення", data.paymentMethods == "По домовленості" ? customerMessagePayByAgreement : customerMessage);

        // HTML-Template for manager
        const managerMessage = `
          <h2> НОВЕ ЗАМОВЛЕННЯ </h2>
          <ul style="font-size: 16px; color: #555;">
              <li><b>Клієнт:</b> ${data.lastName} ${data.firstName}</li>
              <li><b>Email:</b> ${data.email}</li>
              <li><b>Телефон:</b> ${data.phone}</li>
              <li><b>Адреса:</b> ${data.address}, ${data.city}</li>
              <li><b>Вид доставки:</b> ${data.selectedToggle
                ? (data.selectedToggle === 'courier' ? "Кур'єром" : data.selectedToggle)
                : "Не вказано"}  
            </li>
                <li><b>Відділення:</b> ${data.warehouse}</li>
                <li><b>Оплата:</b> ${data.paymentMethods}</li>
              <li><b>Загальна сума:</b> ${totalAmount.toFixed(2)} грн.</li>
          </ul>
          <h3 style="color: #333;">Деталі замовлення:</h3>
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
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.price.toFixed(2)} грн.</td>
                    <td style="padding: 10px; border-bottom: 1px solid #ddd;">${item.quantity}</td>
                </tr>
            `).join('')}
        </tbody>
    </table>
      `;

        await sendEmail(MANAGER_EMAIL, "Нове замовлення отримано", managerMessage);

        return NextResponse.json({ message: "Замовлення оброблено, електронні листи надіслано" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error to sent email", details: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
