// components/ui/CallButton.tsx
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
      className="fixed bottom-5 right-7 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-cyan-700 text-white shadow-md transition-transform duration-300 hover:scale-110 hover:bg-cyan-800 sm:bottom-4 sm:right-4 sm:h-12 sm:w-12"
    >
      <Phone className="h-6 w-6" />
    </button>
  );
};

export default CallButton;
