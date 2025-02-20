from flask import Flask, request, jsonify
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Erlaubt alle Domains

# E-Mail-Konfiguration
SMTP_SERVER = "smtp.gmail.com"  # Ersetze mit deinem SMTP-Server
SMTP_PORT = 587
SMTP_USERNAME = "barcoblancotest@gmail.com"
SMTP_PASSWORD = "lkym qujz nwck ploq"
MANAGER_EMAIL = "barcoblancotest@gmail.com"

def send_email(to_email, subject, body):
    msg = MIMEMultipart()
    msg["From"] = SMTP_USERNAME
    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
        server.starttls()
        server.login(SMTP_USERNAME, SMTP_PASSWORD)
        server.sendmail(SMTP_USERNAME, to_email, msg.as_string())

@app.route("backend/send-order", methods=["POST"])
def send_order():
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    # E-Mail an den Kunden
    customer_email = data["email"]
    customer_message = f"""
    Привіт {data['fullName']},

    Дякуємо за ваше замовлення! Ось його деталі:

    📍 Адреса: {data['address']}
    🏙 Місто: {data['city']}
    💰 Загальна сума: ${sum(item['price'] * item['quantity'] for item in data['cart'])}

    Ми починаємо обробку вашого замовлення і скоро зв’яжемося з вами для підтвердження.  
    Якщо у вас є будь-які питання, не соромтеся звертатися.

    З найкращими побажаннями,  
    Ваша команда Barcoblanco
    """
    send_email(customer_email, "Підтвердження замовлення", customer_message)

    # E-Mail an den Manager
    manager_message = f"""
    🔔 НОВЕ ЗАМОВЛЕННЯ 🔔

    👤 Клієнт: {data['fullName']}
    📧 Email: {data['email']}
    📞 Телефон: {data['phone']}
    📍 Адреса: {data['address']}, {data['city']}
    💰 Загальна сума: ${sum(item['price'] * item['quantity'] for item in data['cart'])}

    🛍 Деталі замовлення:
    {data['cart']}

    Будь ласка, перевірте та підтвердіть замовлення якомога швидше.
    """
    send_email(MANAGER_EMAIL, "Нове замовлення отримано", manager_message)

    return jsonify({"message": "Замовлення оброблено, електронні листи надіслано"}), 200


if __name__ == "__main__":
    app.run(debug=True)
