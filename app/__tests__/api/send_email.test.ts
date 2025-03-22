import { NextResponse } from "next/server";
import { POST } from "../../api/send_email/route";

// Haupt-Mock für `nodemailer`
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn(),
  })),
}));

import nodemailer from "nodemailer";

describe("API: /api/send_email", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Setzt alle Mocks vor jedem Test zurück
  });

  it("should return 400 if data is missing", async () => {
    const request = new Request("http://localhost/api/send_email", {
      method: "POST",
      body: JSON.stringify({}), // Fehlende Daten
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(400);
    expect(json.error).toBe("Invalid data received");
  });

  it("should return 200 if email is sent successfully", async () => {
    // Erfolgreicher sendMail-Mock
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: jest.fn().mockResolvedValue(true),
    });

    const request = new Request("http://localhost/api/send_email", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Test User",
        email: "test@example.com",
        phone: "123456789",
        address: "Test Street",
        city: "Test City",
        cart: [{ id: "1", name: "Test Item", price: 100, quantity: 1 }],
      }),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(200);
    expect(json.message).toBe("Замовлення оброблено, електронні листи надіслано");
  });

  it("should return 500 if email sending fails", async () => {
    // Mock für Fehlerfall
    (nodemailer.createTransport as jest.Mock).mockReturnValue({
      sendMail: jest.fn().mockRejectedValue(new Error("Email error")),
    });

    const request = new Request("http://localhost/api/send_email", {
      method: "POST",
      body: JSON.stringify({
        fullName: "Test User",
        email: "test@example.com",
        phone: "123456789",
        address: "Test Street",
        city: "Test City",
        cart: [{ id: "1", name: "Test Item", price: 100, quantity: 1 }],
      }),
    });

    const response = await POST(request);
    const json = await response.json();

    expect(response.status).toBe(500);
    expect(json.error).toBe("Error to sent email"); // Muss mit deiner API übereinstimmen
  });
});
