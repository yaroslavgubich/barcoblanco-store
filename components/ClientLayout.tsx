// components/ClientLayout.tsx
"use client";

import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/nextjs";
import { CartProvider } from "@/context/CartContext";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

/**
 * This client component wraps the entire app with:
 * - ClerkProvider for auth
 * - CartProvider for cart state
 * - Navbar & Footer on every page
 */
export default function ClientLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <CartProvider>
        <div className="app-container">
          <Navbar />
          <main className="main-container">{children}</main>
          <Footer />
        </div>
      </CartProvider>
    </ClerkProvider>
  );
}
