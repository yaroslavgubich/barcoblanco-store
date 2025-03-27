// app/(store)/page.tsx

import React from "react";
import { client } from "../../sanity/lib/client";
import { bannerQuery, productQuery } from "../../sanity/lib/queries";
import {
  HeroBanner,
  AboutSection,
  Categories,
  PopularProducts,
} from "../../components/ui";
import Features from "../../components/ui/Features";
import CallButton from "../../components/ui/CallButton";

// NEW import
import BannerCarousel from "../../components/ui/BannerCarousel";

const Home = async () => {
  const bannerData = await client.fetch(bannerQuery);
  const productsData = await client.fetch(productQuery);

  return (
    <>
      {/* If you want to use your HeroBanner for a single hero item */}
      <HeroBanner heroBanner={bannerData?.[0]} />

      {/* Swiper Banner Carousel: pass the "images" array */}
      {bannerData?.[0]?.images?.length > 0 && (
        <BannerCarousel images={bannerData[0].images} />
      )}

      <Categories />
      <PopularProducts productsData={productsData} />
      <Features />
      <CallButton />
      <AboutSection />
    </>
  );
};

export default Home;
