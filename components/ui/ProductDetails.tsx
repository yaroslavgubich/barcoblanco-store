"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductDetailsProps {
  productData: {
    name: string;
    image: { asset: { url: string }; alt?: string }[] | null;
    price: number;
    details: string;
    category: string;
    width?: number;
    isPopular?: boolean;
  };
}

export default function ProductDetails({ productData }: ProductDetailsProps) {
  const { name, image, price, details, width, isPopular } = productData;

  const images =
    Array.isArray(image) && image.length > 0
      ? image
      : [{ asset: { url: "/images/placeholder.svg" }, alt: "placeholder" }];

  const [activeImage, setActiveImage] = useState<string>(images[0].asset.url);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: name,
      name,
      price,
      image: activeImage,
      quantity: 1,
    });
  };

  return (
    <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-10">
      {/* Блок изображений */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        {/* Главное изображение */}
   {/* Главное изображение */}
<div className="w-full max-w-[500px] md:max-w-[700px] aspect-[4/3] overflow-hidden rounded-lg shadow-md mb-4">
  <Image
    src={activeImage}
    alt={name}
    width={700}
    height={600}
    className="w-full h-full object-cover"
  />
</div>


        {/* Миниатюры */}
        <div className="flex gap-3 w-full max-w-[700px]">
          {images.length > 1
            ? images.slice(0, 4).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImage(img.asset.url)}
                  className={`flex-1 aspect-[4/3] overflow-hidden rounded-md border transition ${
                    activeImage === img.asset.url
                      ? "border-[#1996A3] border-2"
                      : "border-gray-300"
                  }`}
                >
                  <Image
                    src={img.asset.url}
                    width={160}
                    height={110}
                    alt={img.alt || `thumbnail-${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))
            : [1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="flex-1 aspect-[4/3] bg-gray-200 rounded-md border border-dashed border-gray-400 flex items-center justify-center text-xs text-gray-500"
                >
                  Заглушка
                </div>
              ))}
        </div>
      </div>

      {/* Блок информации */}
      <div className="flex-1 space-y-6 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1996A3]">{name}</h1>
        <p className="text-xl sm:text-2xl font-semibold text-gray-900">Ціна: {price} грн</p>
        <p className="text-gray-700 text-base sm:text-lg">{details}</p>
        {width && <p className="text-gray-500">Ширина: {width} см</p>}
        {isPopular && <p className="text-[#1996A3] font-semibold">🔥 Популярний продукт</p>}

        <div className="flex justify-center md:justify-start">
          <Button
            onClick={handleAddToCart}
            className="w-full max-w-xs bg-[#1996a3] hover:bg-[#147a86] text-white py-3 text-lg"
          >
            Додати в кошик
          </Button>
        </div>
      </div>
    </div>
  );
}




