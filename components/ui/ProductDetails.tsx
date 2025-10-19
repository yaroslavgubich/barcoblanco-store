//components/ui/ProductDetails.tsx

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

interface ProductImage {
  asset: { url: string };
  alt?: string;
}

interface ProductDetailsProps {
  productData: {
    name: string;
    image: ProductImage[] | null;
    price: number;
    details: string;
    category: string;
    width?: number;
    height?: number;
    depth?: number;
    isPopular?: boolean;
    color?: string;
    article?: string;
    reviewsCount?: number;
    isAvailable?: boolean;
  };
}

export default function ProductDetails({ productData }: ProductDetailsProps) {
  const {
    name,
    image,
    price,
    details,
    width,
    color,
    article,
    height,
    depth,
    isAvailable,
  } = productData;

  const { addToCart } = useCart();

  const images =
    Array.isArray(image) && image.length > 0
      ? image.filter(img => img?.asset?.url) // Filter out images with null asset
      : [{ asset: { url: "/images/placeholder.svg" }, alt: "placeholder" }];

  const handleAddToCart = () => {
    addToCart({
      id: name,
      name,
      price,
      image: images[0]?.asset?.url || "/images/placeholder.svg",
      quantity: 1,
    });
  };

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);
  const [swiperReady, setSwiperReady] = useState(false);

  useEffect(() => {
    setSwiperReady(true);
  }, []);
  console.log("Product dimensions:", { width, height, depth });
  console.log("Full productData:", productData);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-10">
      {/* Контейнер: вертикально на мобильном, горизонтально на md+ */}
      <div className="flex flex-col md:flex-row gap-10">
        {/* Левая часть – слайдер */}
        <div className="w-11/12 max-w-sm mx-auto md:w-1/2 lg:w-5/12 relative">
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
              // На мобильном устройстве высота больше, чтобы картинка выглядела более "портретной"
              className="w-full h-96 sm:h-[500px] md:h-[450px] rounded-xl overflow-hidden"
            >
              {images.map((img, index) => (
                <SwiperSlide key={index}>
                  <div className="relative w-full h-full">
                    <Image
                      src={img?.asset?.url || "/images/placeholder.svg"}
                      alt={img?.alt || `image-${index}`}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          {/* Стрелка "Назад" вне картинки */}
          <button
            ref={prevRef}
            className="absolute top-1/2 left-[-20px] md:left-[-60px] -translate-y-1/2 bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white transition transform hover:scale-110 w-9 h-9 rounded-full shadow-lg z-10 flex items-center justify-center"
            aria-label="Previous slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>

          {/* Стрелка "Вперед" вне картинки */}
          <button
            ref={nextRef}
            className="absolute top-1/2 right-[-20px] md:right-[-60px] -translate-y-1/2 bg-white text-[#1996A3] hover:bg-[#1996A3] hover:text-white transition transform hover:scale-110 w-9 h-9 rounded-full shadow-lg z-10 flex items-center justify-center"
            aria-label="Next slide"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </div>

        {/* Правая часть – информация о товаре */}
        <div className="w-full md:w-1/2 lg:w-7/12 flex flex-col md:ml-16 space-y-6 text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-800">
            {name}
          </h1>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-sm text-gray-600">
            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md">
              Артикул: {article}
            </span>
            <div className="flex items-center gap-1"></div>
            {isAvailable ? (
              <span className="text-green-600 font-semibold">В наявності</span>
            ) : (
              <span className="text-red-500 font-semibold">
                Немає в наявності
              </span>
            )}
          </div>

          <div className="text-3xl font-bold text-gray-800">
            {price.toFixed(2)} <span className="text-xl font-medium">грн</span>
          </div>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {isAvailable && (
              <Button
                onClick={handleAddToCart}
                className="bg-[#1996a3] hover:bg-[#147a86] text-white py-4 px-8 text-lg font-bold rounded-lg shadow-lg transition transform hover:scale-105"
              >
                <div className="flex items-center gap-3">
                  <Image
                    src="/icons/cart.png"
                    alt="Cart"
                    width={24}
                    height={24}
                  />
                  <span>В кошик</span>
                </div>
              </Button>
            )}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3 text-gray-700 text-sm">
            <p>{details}</p>
            {width && (
              <p className="text-gray-600">
                <span className="font-medium">Ширина:</span> {width} см
              </p>
            )}
            {height && (
              <p className="text-gray-600">
                <span className="font-medium">Висота:</span> {height} см
              </p>
            )}
            {depth && (
              <p className="text-gray-600">
                <span className="font-medium">Глибіна:</span> {depth} см
              </p>
            )}
            {/* why do we need this? */}
            {color && (
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="font-medium text-gray-600">Колір:</span>
                <span className="text-gray-600">{color}</span>
                <span
                  className="inline-block w-4 h-4 rounded-full border border-gray-300"
                  style={{ backgroundColor: color.toLowerCase() }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
