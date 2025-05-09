"use client";

import { useRouter } from "next/navigation";
import React from "react";

const BackButton: React.FC = () => {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="flex items-center gap-2 px-4 py-2 rounded-xl border mt-[20px] ml-[10px] md:ml-[40px] 
      text-[#1996A3] border-[#1996A3] 
      hover:text-[#147A86] hover:border-[#147A86] 
      transition-colors duration-300"
    >
      
      {/* SVG стрелка влево */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="2"
        stroke="currentColor"
        className="w-5 h-5 text-[#1996A3] group-hover:text-[#147A86] transition-colors duration-300"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15 19l-7-7 7-7"
        />
      </svg>
      Назад
    </button>
  );
};

export default BackButton;
