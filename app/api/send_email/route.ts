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
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">
  <h2 style="color: #2c3e50;">Привіт ${data.firstName},</h2>
  <p style="font-size: 16px; color: #555;">Дякуємо за ваше замовлення! Нижче ви знайдете всі деталі:</p>

  <ul style="list-style: none; padding: 0; font-size: 16px; color: #555; line-height: 1.6;">
    ${data.lastName || data.firstName ? `<li><strong>Клієнт:</strong> ${data.lastName ?? ""} ${data.firstName ?? ""}</li>` : ""}
    ${data.address ? `<li><strong>Адреса:</strong> ${data.address}</li>` : ""}
    ${data.city ? `<li><strong>Місто:</strong> ${data.city}</li>` : ""}
    <li><strong>Доставка:</strong> 
      ${data.deliveryMethod === "pickup"
                ? "Самовивіз"
                : data.deliveryMethod === "ukr-poshta"
                    ? "Укр Пошта"
                    : data.deliveryMethod === "nova-poshta"
                        ? "Нова Пошта"
                        : "Не вказано"}
    </li>
    ${data.selectedToggle
                ? `<li><strong>Вид доставки:</strong> ${data.selectedToggle === 'courier' ? "Кур'єром" : data.selectedToggle}</li>`
                : ""}
    ${data.warehouse ? `<li><strong>Відділення:</strong> ${data.warehouse}</li>` : ""}
    ${data.paymentMethods ? `<li><strong>Оплата:</strong> ${data.paymentMethods}</li>` : ""}
    <li><strong>Загальна сума:</strong> ${totalAmount.toFixed(2)} грн.</li>
  </ul>

  <h3 style="color: #2c3e50; margin-top: 30px;">Деталі замовлення:</h3>
  <table style="width: 100%; border-collapse: separate; border-spacing: 0 8px; font-size: 15px; color: #333; margin-top: 15px;">
    <thead>
      <tr style="background-color: #f5f7fa;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0; border-radius: 8px 0 0 0;">Зображення</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0;">Назва</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0;">Ціна</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0; border-radius: 0 8px 0 0;">Кількість</th>
      </tr>
    </thead>
    <tbody>
      ${data.cart
                .map((item) => `
          <tr style="background-color: #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border-radius: 8px;">
            <td style="padding: 12px; border-top-left-radius: 8px; border-bottom-left-radius: 8px;">
              <img src="${item.image}" alt="${item.name}" width="70" style="border-radius: 6px;">
            </td>
            <td style="padding: 12px;">${item.name}</td>
            <td style="padding: 12px;">${item.price.toFixed(2)} грн.</td>
            <td style="padding: 12px; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">${item.quantity}</td>
          </tr>
        `)
                .join('')}
    </tbody>
  </table>

  <p style="font-size: 16px; color: #555; margin-top: 30px;">
    Наш менеджер зв’яжеться з вами якнайшвидше для підтвердження та обробки замовлення.<br>
    Якщо питання термінове — зателефонуйте нам: 
    <a href="tel:+380666924322" style="color: #3498db; text-decoration: none;">+38 (066) 69-24-322</a>.
  </p>
</div>
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
        <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; color: #333;">
  <h2 style="color: #2c3e50;">НОВЕ ЗАМОВЛЕННЯ</h2>

  <ul style="list-style: none; padding: 0; font-size: 16px; color: #555; line-height: 1.6;">
    ${data.lastName || data.firstName ? `<li><strong>Клієнт:</strong> ${data.lastName ?? ""} ${data.firstName ?? ""}</li>` : ""}
    ${data.email ? `<li><strong>Email:</strong> ${data.email}</li>` : ""}
    ${data.phone ? `<li><strong>Телефон:</strong> ${data.phone}</li>` : ""}
    ${(data.address || data.city) ? `<li><strong>Адреса:</strong> ${data.address ?? ""}${data.city ? ", " + data.city : ""}</li>` : ""}
    <li><strong>Доставка:</strong> 
      ${data.deliveryMethod === "pickup"
          ? "Самовивіз"
          : data.deliveryMethod === "ukr-poshta"
              ? "Укр Пошта"
              : data.deliveryMethod === "nova-poshta"
                  ? "Нова Пошта"
                  : "Не вказано"}
    </li>
    ${data.selectedToggle
        ? `<li><strong>Вид доставки:</strong> ${data.selectedToggle === 'courier' ? "Кур'єром" : data.selectedToggle}</li>`
        : ""}
    ${data.warehouse ? `<li><strong>Відділення:</strong> ${data.warehouse}</li>` : ""}
    ${data.paymentMethods ? `<li><strong>Оплата:</strong> ${data.paymentMethods}</li>` : ""}
    <li><strong>Загальна сума:</strong> ${totalAmount.toFixed(2)} грн.</li>
  </ul>

  <h3 style="color: #2c3e50; margin-top: 30px;">Деталі замовлення:</h3>
  <table style="width: 100%; border-collapse: separate; border-spacing: 0 8px; font-size: 15px; color: #333; margin-top: 15px;">
    <thead>
      <tr style="background-color: #f5f7fa;">
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0; border-radius: 8px 0 0 0;">Зображення</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0;">Назва</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0;">Ціна</th>
        <th style="padding: 12px; text-align: left; border-bottom: 2px solid #e0e0e0; border-radius: 0 8px 0 0;">Кількість</th>
      </tr>
    </thead>
    <tbody>
      ${data.cart
        .map((item) => `
          <tr style="background-color: #ffffff; box-shadow: 0 1px 4px rgba(0,0,0,0.06); border-radius: 8px;">
            <td style="padding: 12px; border-top-left-radius: 8px; border-bottom-left-radius: 8px;">
              <img src="${item.image}" alt="${item.name}" width="70" style="border-radius: 6px;">
            </td>
            <td style="padding: 12px;">${item.name}</td>
            <td style="padding: 12px;">${item.price.toFixed(2)} грн.</td>
            <td style="padding: 12px; border-top-right-radius: 8px; border-bottom-right-radius: 8px;">${item.quantity}</td>
          </tr>
        `)
        .join('')}
    </tbody>
  </table>
</div>`;

        await sendEmail(MANAGER_EMAIL, "Нове замовлення отримано", managerMessage);

        return NextResponse.json({ message: "Замовлення оброблено, електронні листи надіслано" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Error to sent email", details: (error as Error).message }, { status: 500 });
    }
}

export async function GET() {
    return NextResponse.json({ message: "Success" }, { status: 200 });
}
