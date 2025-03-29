"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";

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

  const images =
    Array.isArray(image) && image.length > 0
      ? image
      : [{ asset: { url: "/images/placeholder.svg" }, alt: "placeholder" }];

  const [activeImage, setActiveImage] = useState<string>(images[0].asset.url);
  const [openLightbox, setOpenLightbox] = useState(false);

  const lightboxSlides = images.map((img) => ({
    src: img.asset.url,
    alt: img.alt || "",
  }));

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
    <div className="max-w-7xl mx-auto bg-white p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-12">
      {/* Блок изображений */}
      <div className="flex-1 max-w-full md:max-w-[500px] flex flex-col md:flex-row items-center md:items-start gap-4">
        {/* Главное изображение */}
        <div
          onClick={() => setOpenLightbox(true)}
          className="w-full max-w-[300px] sm:max-w-[350px] md:max-w-[400px] aspect-[3/4] overflow-hidden rounded-lg shadow-md cursor-zoom-in"
        >
          <Image
            src={activeImage}
            alt={name}
            width={400}
            height={600}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Миниатюры */}
        {images.length > 1 && (
          <div className="flex flex-col gap-3 md:mt-0 mt-4">
            {images.slice(0, 4).map((img, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(img.asset.url)}
                className={`rounded-md border transition overflow-hidden ${activeImage === img.asset.url
                    ? "border-[#1996A3] border-2"
                    : "border-gray-300"
                  } 
                  w-[70px] h-[50px] sm:w-[90px] sm:h-[65px] md:w-[110px] md:h-[80px]`}
              >
                <Image
                  src={img.asset.url}
                  alt={img.alt || `thumbnail-${index}`}
                  width={110}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Блок информации */}
      <div className="flex-1 space-y-4 text-center md:text-left">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1996A3]">{name}</h1>

        {/* Ціна */}
        <p className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">{price} грн</p>

        {/* Описание, ширина, цвет, популярность */}
        <div className="space-y-4 mt-6">
          <p className="text-gray-700 text-base sm:text-lg">{details}</p>
          {width && <p className="text-gray-500">Ширина: {width} см</p>}
          {color && (
            <div className="flex items-center gap-2 text-gray-500">
              <span>Колір: {color}</span>
              <span
                className="inline-block w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: color.toLowerCase() }}
              />
            </div>
          )}
          {isPopular && <p className="text-[#1996A3] font-semibold">🔥 Популярний продукт</p>}
        </div>

        {/* Кнопка */}
        <div className="flex justify-center md:justify-start">
          <Button
            onClick={handleAddToCart}
            className="w-full max-w-xs bg-[#1996a3] hover:bg-[#147a86] text-white py-3 text-lg"
          >
            Додати в кошик
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      <Lightbox
        open={openLightbox}
        close={() => setOpenLightbox(false)}
        slides={lightboxSlides}
        plugins={[Thumbnails]}
        styles={{ container: { backgroundColor: "transparent" } }}
      />
    </div>
  );
}


