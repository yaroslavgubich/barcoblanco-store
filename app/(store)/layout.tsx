import "../globals.css"; 
import Navbar from "../../components/ui/Navbar";
import Footer from "../../components/ui/Footer";
import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata = {
  title: "Barcoblanco",
  description: "Barcoblanco online store for bathroom furniture",
};

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
      </div>
    </ClerkProvider>
  );
}
