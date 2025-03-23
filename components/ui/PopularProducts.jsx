"use client";

import React, { useRef } from "react";
import { Product } from "../ui";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

const PopularProducts = ({ productsData }) => {
  const swiperRef = useRef(null);
  const limitedProducts = productsData?.slice(0, 6);

  return (
    <div className="container max-w-[1400px] mx-auto px-4 mb-12">
      <div className="popular-products-wrapper flex flex-col">
        <h3 className="text-left text-[28px] md:text-[36px] text-[#008c99] mb-5 font-bold">
          ПОПУЛЯРНІ ПРОДУКТИ
        </h3>

        <div className="relative">
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1.2}
            pagination={{
              el: ".custom-pagination",
              clickable: true,
            }}
            loop={true}
            grabCursor={true}
            autoplay={{
              delay: 1500,
              disableOnInteraction: false,
            }}
            speed={1000}
            breakpoints={{
              480: { slidesPerView: 1.5 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            className="w-full pb-16"
          >

            {limitedProducts.map((product) => (
              <SwiperSlide key={product._id}>
                <div className="px-3 h-full">
                  <div className="bg-white h-full">
                    <Product product={product} />
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-pagination mt-8 flex justify-center"></div>
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;







