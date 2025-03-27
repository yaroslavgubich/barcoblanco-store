"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../sanity/lib/client";

interface BannerImage {
  _key?: string;
  alt?: string;
  asset?: {
    _ref?: string;
    _type?: string;
  };
}

interface BannerCarouselProps {
  images: BannerImage[];
}

const BannerCarousel: React.FC<BannerCarouselProps> = ({ images }) => {
  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="relative w-full h-[600px]">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="w-full h-full"
      >
        {images.map((image) => (
          <SwiperSlide key={image._key} className="relative w-full h-full">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || "Banner Image"}
              fill
              className="object-cover"
              priority
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Overlay Button */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20">
        <Link href="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl shadow-lg transition">
            View All Products
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BannerCarousel;
