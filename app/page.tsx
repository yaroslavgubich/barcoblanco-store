import React from "react";
import {
  HeroBanner,
  AboutSection,
  Categories,
  PopularProducts,
} from "./components";
import { client } from "./client";
import {
  bannerQuery,
  productQuery,
} from "./studio/queries";
import Features from "./components/Features";
import CallButton from "./components/CallButton";

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
