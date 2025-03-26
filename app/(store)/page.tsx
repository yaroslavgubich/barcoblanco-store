// app/(store)/page.tsx
import React from "react";
import {
  HeroBanner,
  AboutSection,
  Categories,
  PopularProducts,
} from "../../components/ui";
import { client } from "../../sanity/lib/client";
import { bannerQuery, productQuery } from "../../sanity/lib/queries";
import Features from "../../components/ui/Features";
import CallButton from "../../components/ui/CallButton";

const Home = async () => {
  const bannerData = await client.fetch(bannerQuery);
  const productsData = await client.fetch(productQuery);

  return (
    <>
    
      <HeroBanner heroBanner={bannerData?.[0]} />
      <Categories />
      <PopularProducts productsData={productsData} />
      <Features />
      <CallButton />
      <AboutSection />
    </>
  );
};

export default Home;
