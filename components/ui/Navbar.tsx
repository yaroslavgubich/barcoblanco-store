"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Menu, Search, ShoppingCart, User } from "lucide-react";

type Language = "UA" | "EN";

const Navbar: React.FC = () => {
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("UA");
  const router = useRouter();

  const handleLanguageChange = (lang: Language) => {
    setSelectedLanguage(lang);
  };

  return (
    <header className="mt-2 bg-transparent">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-4">
        {/* Left: Burger menu and Logo */}
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setDrawerOpen(true)}
          >
            <Menu className="h-6 w-6 text-cyan-700" />
          </Button>

          <div
            className="hidden cursor-pointer md:block"
            onClick={() => router.push("/")}
          >
            <Image
              src="/icons/logo.svg"
              alt="Логотип"
              width={40}
              height={40}
              className="h-10"
            />
          </div>
        </div>

        {/* Center: Search Bar */}
        <div className="relative w-[535px] max-w-full">
          <Input placeholder="Пошук" className="pl-9" />
          <Search className="absolute top-2.5 left-2 h-5 w-5 text-cyan-700" />
        </div>

        {/* Right: Language Switch, Cart, User */}
        <div className="flex items-center gap-4">
          <span
            className={`cursor-pointer ${
              selectedLanguage === "UA"
                ? "font-bold text-cyan-700"
                : "text-gray-400"
            }`}
            onClick={() => handleLanguageChange("UA")}
          >
            UA
          </span>
          <span className="text-cyan-700">|</span>
          <span
            className={`cursor-pointer ${
              selectedLanguage === "EN"
                ? "font-bold text-cyan-700"
                : "text-gray-400"
            }`}
            onClick={() => handleLanguageChange("EN")}
          >
            EN
          </span>

          <div className="relative cursor-pointer">
            <ShoppingCart className="h-6 w-6 text-cyan-700" />
            <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
              4
            </div>
          </div>

          <User className="h-6 w-6 cursor-pointer text-cyan-700" />
        </div>
      </div>

      {/* Burger Menu Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent side="left" className="w-[250px] bg-gray-50 p-4">
          <div className="mb-4">
            <h2 className="text-2xl font-bold text-cyan-700">Контакти</h2>
            <p className="text-sm">+380-99-22-33-453</p>
            <p className="mt-4 text-sm">Вт-Нед: 09:00 - 20:00</p>
            <p className="text-sm">Вихідний: Понеділок</p>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  );
};

export default Navbar;
