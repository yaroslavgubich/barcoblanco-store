
// Diese Funktion wird von Vercel als Serverless Function aufgerufen
export default function handler(req, res) {
    // Erstelle die Antwort als JSON
    const response = {
        statusCode: 200
    };

    // Sende die Antwort zurück
    res.status(200).json(response);
}
