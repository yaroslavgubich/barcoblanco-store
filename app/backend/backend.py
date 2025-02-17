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

@app.route("/send-order", methods=["POST"])
def send_order():
    data = request.json

    if not data:
        return jsonify({"error": "No data received"}), 400

    # Customer-E-Mail
    customer_email = data["email"]
    customer_message = f"""
    Hello {data['fullName']},

    Thank you for your order! Here are your order details:
    - Address: {data['address']}
    - City: {data['city']}
    - Total: ${sum(item['price'] * item['quantity'] for item in data['cart'])}

    We will process your order shortly.

    Best regards,
    Your Company
    """
    send_email(customer_email, "Order Confirmation", customer_message)

    # Manager-E-Mail
    manager_message = f"""
    New Order Received:

    Customer: {data['fullName']}
    Email: {data['email']}
    Phone: {data['phone']}
    Address: {data['address']}, {data['city']}
    Total Price: ${sum(item['price'] * item['quantity'] for item in data['cart'])}

    Order Details:
    {data['cart']}
    """
    send_email(MANAGER_EMAIL, "New Order Received", manager_message)

    return jsonify({"message": "Order processed and emails sent"}), 200

if __name__ == "__main__":
    app.run(debug=True)
