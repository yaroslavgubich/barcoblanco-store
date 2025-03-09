import json

# Diese Funktion wird von Vercel als Serverless Function aufgerufen
def handler():
    # Erstelle die Antwort als JSON
    response = {
        "statusCode": 200,
    }
    
    return response
