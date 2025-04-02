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
      style={{ animationDuration: "3s" }}
      className="fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-700 text-white shadow-2xl transition-all duration-300 hover:scale-110 hover:bg-cyan-800 animate-bounce

             sm:h-16 sm:w-16
             md:h-18 md:w-18 md: right-10
             lg:h-20 lg:w-20
             xl:h-22 xl:w-22"
    >
      <Phone className="h-7 w-7 sm:h-8 sm:w-8 md:h-9 md:w-9 lg:h-10 lg:w-10 xl:h-11 xl:w-11" />
    </button>
  );
};

export default CallButton;
