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
    <div
      className="banner-container"
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 7", // 📐 proportional height
        maxHeight: "500px", // optional max height
        overflow: "hidden",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        className="banner-swiper"
        style={{ width: "100%", height: "100%" }}
      >
        {images.map((image) => (
          <SwiperSlide key={image._key} className="banner-slide" style={{ position: "relative" }}>
            <Image
              src={urlFor(image).url()}
              alt={image.alt || "Banner Image"}
              fill
              priority
              style={{
                objectFit: "cover",
              }}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <div
        className="banner-button-wrapper"
        style={{
          position: "absolute",
          bottom: "2rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 10,
        }}
      >
        <Link href="/products">
          <button
            className="banner-button"
            style={{
              padding: "10px 24px",
              fontSize: "1rem",
              backgroundColor: "#008c99",
              color: "#fff",
              border: "none",
              borderRadius: "20px",
              cursor: "pointer",
            }}
          >
            До каталогу
          </button>
        </Link>
      </div>
    </div>
  );
};

export default BannerCarousel;
