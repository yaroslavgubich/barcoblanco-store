from flask import Flask, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)

# Flask-Mail-Konfiguration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'  # Beispiel für Gmail
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'barcoblancotest@gmail.com'  # Deine E-Mail-Adresse
app.config['MAIL_PASSWORD'] = 'lkym qujz nwck ploq'         # Dein E-Mail-Passwort

mail = Mail(app)

# Endpunkt zum Senden einer E-Mail an den Kunden
@app.route('/email/send-to-customer', methods=['POST'])
def send_email_to_customer():
    data = request.get_json()
    subject = data.get('subject', 'Standard Betreff')
    recipient = data.get('to')
    body = "Sehr geehrte/r Kunde, ..."  # Fester Textkörper wie im Java-Code

    msg = Message(subject=subject, recipients=[recipient])
    msg.body = body

    try:
        mail.send(msg)
        return jsonify({"message": "E-Mail an Kunden erfolgreich gesendet!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Endpunkt zum Senden einer E-Mail an den Manager
@app.route('/email/send-to-manager', methods=['POST'])
def send_email_to_manager():
    data = request.get_json()
    subject = data.get('subject', 'Standard Betreff für Manager')
    recipient = data.get('to')
    body = data.get('body', 'Hier ist die Nachricht an den Manager.')

    msg = Message(subject=subject, recipients=[recipient])
    msg.body = body

    try:
        mail.send(msg)
        return jsonify({"message": "E-Mail an Manager erfolgreich gesendet!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Test-Endpunkt
@app.route('/test', methods=['GET'])
def test_api():
    return "Success!", 200

# Main-Methode zum Starten der Anwendung
if __name__ == '__main__':
    app.run(port=5000, debug=True)
