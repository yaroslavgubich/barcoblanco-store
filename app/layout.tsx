import "./globals.css";
import { ReactNode } from "react";
import ClientLayout from "@/components/ClientLayout";

export const metadata = {
  title: "Barcoblanco store",
  description: "Barcoblanco online store for bathroom furniture",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {/* Render a Client Component that wraps everything in ClerkProvider & CartProvider */}
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  );
}
