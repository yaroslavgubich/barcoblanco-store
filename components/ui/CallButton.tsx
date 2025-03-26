"use client";

import React from "react";
import { Phone } from "lucide-react";

const CallButton: React.FC = () => {
  const handleCall = () => {
    window.location.href = "tel:+380666924322";
  };

  return (
    <button
      onClick={handleCall}
      aria-label="Call"
      className="fixed bottom-8 right-10 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-cyan-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-cyan-800 sm:bottom-6 sm:right-6 sm:h-18 sm:w-18 animate-bounce-custom"
    >
      <Phone className="h-10 w-10" />
    </button>
  );
};

export default CallButton;



