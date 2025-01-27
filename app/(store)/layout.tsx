import "../globals.css";
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Barcoblanco",
  description: "Barcoblanco online store for bathroom furniture",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider dynamic>
      <html lang="en">
        <body>
          <div className="app-container">
            <Navbar />
            <main className="main-container">{children}</main>
            <Footer />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
