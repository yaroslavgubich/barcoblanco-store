"use client"; // Force this component to run on the client side

import React, { useRef, useEffect } from "react";
import { Product } from "../ui";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const PopularProducts = ({ productsData }) => {
  const swiperRef = useRef(null);
  const timeoutRef = useRef(null);
  // Store the default timing function so we can revert back after manual transition.
  const defaultTimingFunctionRef = useRef("ease-out");
  const limitedProducts = productsData?.slice(0, 6);

  // Define speeds:
  const autoplaySpeed = 1000; // 2000ms for autoplay transitions
  const manualSpeed = 500; // 500ms for manual (arrow click) transitions

  useEffect(() => {
    // Ensure the Swiper instance and its navigation elements exist.
    if (!swiperRef.current || !swiperRef.current.navigation) return;

    const { nextEl, prevEl } = swiperRef.current.navigation;
    if (nextEl && prevEl) {
      // Capture the default timing function from the wrapper element.
      if (swiperRef.current.wrapperEl) {
        // If no inline style is set, default to "ease-out".
        defaultTimingFunctionRef.current =
          swiperRef.current.wrapperEl.style.transitionTimingFunction ||
          "ease-out";
      }

      const handleNavClick = () => {
        if (!swiperRef.current) return;

        // Clear any previous timeout in case of rapid clicks.
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        // Set the manual speed for this transition.
        swiperRef.current.params.speed = manualSpeed;

        // Apply a custom easing function for a smoother first frame.
        if (swiperRef.current.wrapperEl) {
          swiperRef.current.wrapperEl.style.transitionTimingFunction =
            "ease-in-out";
        }

        // Reset the speed and easing after the manual transition plus a small buffer.
        timeoutRef.current = setTimeout(() => {
          if (swiperRef.current) {
            swiperRef.current.params.speed = autoplaySpeed;
            if (swiperRef.current.wrapperEl) {
              swiperRef.current.wrapperEl.style.transitionTimingFunction =
                defaultTimingFunctionRef.current;
            }
          }
        }, manualSpeed + 100); // 100ms buffer
      };

      // Add capturing-phase event listeners so our handler runs before Swiper’s default handler.
      nextEl.addEventListener("click", handleNavClick, true);
      prevEl.addEventListener("click", handleNavClick, true);

      // Clean up event listeners and pending timeouts on unmount.
      return () => {
        nextEl.removeEventListener("click", handleNavClick, true);
        prevEl.removeEventListener("click", handleNavClick, true);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
      };
    }
  }, [swiperRef.current]);

  return (
    <div className="popular-products-wrapper">
      <h1 className="popular-products-title">Popular Products</h1>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        spaceBetween={12}
        slidesPerView={5}
        navigation // Built-in navigation arrows are enabled.
        pagination={{ clickable: true }}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 5000, // 5 seconds delay between autoplay transitions
          disableOnInteraction: false,
        }}
        speed={autoplaySpeed} // Default speed for autoplay transitions
        breakpoints={{
          768: { slidesPerView: 5 },
          1024: { slidesPerView: 5 },
        }}
      >
        {limitedProducts.map((product) => (
          <SwiperSlide key={product._id}>
            <Product product={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PopularProducts;
