// app/(store)/layout.tsx
"use client";
import "../globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import { ReactNode } from "react";
import { CartProvider } from "@/context/CartContext";

export default function StoreLayout({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-container">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
