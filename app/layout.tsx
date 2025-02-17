import "./globals.css";
import { ReactNode } from "react";
import Script from "next/script";

export const metadata = {
  title: "Barcoblanco",
  description: "Barcoblanco online store for bathroom furniture",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk">
      <head>
        <Script
          src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
          strategy="afterInteractive"
        />
        <Script id="google-translate-init" strategy="afterInteractive">
          {`
            let isLoaded = false;

            function googleTranslateElementInit() {
              new google.translate.TranslateElement(
                {
                  pageLanguage: 'uk',
                  includedLanguages: 'en',
                  layout: google.translate.TranslateElement.InlineLayout.SIMPLE
                },
                'google_translate_element'
              );
              
              // Setze isLoaded auf true, wenn das Widget geladen ist
              isLoaded = true;
            }

            // Globale Funktion zum Triggern der Übersetzung
            window.triggerTranslate = function(language) {
              if (!isLoaded) {
                // Wenn das Widget noch nicht geladen ist, warten
                alert('Translation frame is not loaded yet. Please try again later.');
                return;
              }
              
              // Auf das Iframe zugreifen und die Sprache wechseln
              const frame = document.querySelector('iframe.goog-te-menu-frame');
              if (frame) {
                const langButton = frame.contentDocument?.querySelector(\`a[lang="\${language}"]\`);
                if (langButton) langButton.click();
              }
            };
          `}
        </Script>
      </head>
      <body>
        {/* Google Translate Widget versteckt */}
        <div id="google_translate_element" style={{ display: "none" }}></div>
        {children}
      </body>
    </html>
  );
}
