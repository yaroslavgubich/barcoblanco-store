//components/ui/HeroBanner.tsx
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
    <div className="banner-container">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        speed={1100}
        className="banner-swiper"
      >
        {images.map((image) => (
          <SwiperSlide key={image._key} className="banner-slide">
            <Image
              src={urlFor(image).url()}
              alt={image.alt || "Banner Image"}
              fill
              className="banner-image"
              priority
            />
          </SwiperSlide>
        ))}
        {/* <div className="banner-button-wrapper">
          <Link href="/products">
            <button className="banner-button">ДО КАТАЛОГУ</button>
          </Link>
        </div> */}
      </Swiper>
    </div>
  );
};

export default BannerCarousel;
