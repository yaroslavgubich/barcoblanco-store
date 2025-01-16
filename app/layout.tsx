import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Metadata to replace the Head component
export const metadata = {
  title: "Barcoblanco",
  description: "Barcoblanco online store for bathroom furnityre",
};

export default function RootLayout({ children }) {
  return (
    <html lang="uk">
      <body>
        <header>
          <Navbar />
          <div id="google_translate_element"></div>
        </header>
        <main className="main-container">{children}</main>
        <footer id="footer">
          <Footer />
        </footer>
      </body>
    </html>
  );
}
