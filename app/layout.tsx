import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Barcoblanco",
  description: "Barcoblanco online store for bathroom furniture",
};

export default function RootLayout({ children }) {
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

