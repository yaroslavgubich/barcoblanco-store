import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { ReactNode } from "react";

export const metadata = {
  title: "Barcoblanco",
  description: "Barcoblanco online store for bathroom furniture",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="app-container">
          <Navbar />
          <main className="main-container">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
