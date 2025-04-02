"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface ProductDetailsProps {
  productData: {
    name: string;
    image: { asset: { url: string }; alt?: string }[] | null;
    price: number;
    details: string;
    category: string;
    width?: number;
    isPopular?: boolean;
    color?: string;
  };
}

export default function ProductDetails({ productData }: ProductDetailsProps) {
  const { name, image, price, details, width, isPopular, color } = productData;
  const { addToCart } = useCart();

  const images =
    Array.isArray(image) && image.length > 0
      ? image
      : [{ asset: { url: "/images/placeholder.svg" }, alt: "placeholder" }];

  const handleAddToCart = () => {
    addToCart({
      id: name,
      name,
      price,
      image: images[0].asset.url,
      quantity: 1,
    });
  };

  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);

  return (
    <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-10 flex flex-col md:flex-row gap-12 rounded-2xl">
      {/* Слайдер */}
      <div className="w-full md:max-w-[500px] mx-auto relative">
        {swiperReady && (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
            }}
            pagination={{
              clickable: true,
              renderBullet: (index, className) =>
                `<span class="${className} !bg-[#CFE8EC] !w-3 !h-3 rounded-full mx-1"></span>`,
            }}
            className="w-full aspect-[3/4] rounded-2xl overflow-hidden"
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <Image
                  src={img.asset.url}
                  alt={img.alt || `image-${index}`}
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}

        {/* Стрелка влево */}
        <button
          ref={prevRef}
          className="absolute top-1/2 left-2 -translate-y-1/2 bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white transition w-10 h-10 rounded-full shadow-md z-10 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Стрелка вправо */}
        <button
          ref={nextRef}
          className="absolute top-1/2 right-2 -translate-y-1/2 bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white transition w-10 h-10 rounded-full shadow-md z-10 flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Информация о товаре */}
      <div className="flex-1 text-center md:text-left flex flex-col justify-center">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1996A3]">{name}</h1>

        {/* Цена */}
        <p className="text-xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4 leading-[1.2] space-y-2">
  {price.toFixed(2)} грн
</p>

        {/* Кнопка */}
        <Button
          onClick={handleAddToCart}
          className="w-full bg-[#1996a3] hover:bg-[#147a86] text-white py-3 px-6 text-lg font-medium rounded-lg shadow-md transition mb-6"
        >
          Додати в кошик
        </Button>

        {/* Описание и характеристики */}
        <div className="space-y-4 text-gray-700">
          <p className="text-base sm:text-lg">{details}</p>
          {width && <p className="text-gray-500">Ширина: {width} см</p>}
          {color && (
            <div className="flex items-center gap-2 justify-center md:justify-start text-gray-500">
              <span>Колір: {color}</span>
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            </div>
          )}
          {isPopular && (
            <p className="text-[#1996A3] font-semibold">🔥 Популярний продукт</p>
          )}
        </div>
      </div>
    </div>
  );
}


