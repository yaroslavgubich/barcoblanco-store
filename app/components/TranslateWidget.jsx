"use client";

import React, { useEffect } from "react";

const TranslateWidget = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      document.body.appendChild(script);
    };

    const initGoogleTranslate = () => {
      if (window.google && window.google.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "uk",
            includedLanguages: "en,uk",
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL
          },
          "google_translate_element"
        );
      }
    };

    window.googleTranslateElementInit = initGoogleTranslate;
    addGoogleTranslateScript();
  }, []);

  return <div id="google_translate_element"></div>;
};

export default TranslateWidget;
