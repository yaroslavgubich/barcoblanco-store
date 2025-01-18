import React from "react";
import {
  HeroBanner,
  Product,
  AboutSection,
  Categories,
  PopularProducts,
  
} from "./components";
import { client } from "./lib/client";
import {
  bannerQuery,
  productQuery,
  footerQuery,
} from "./sanity_barcoblanco/queries";
import Features from "./components/Features";
import CallButton from "./components/CallButton";



const Home = async () => {
  const bannerData = await client.fetch(bannerQuery);
  const productsData = await client.fetch(productQuery);
  const footerData = await client.fetch(footerQuery);
 
  return (
    <>
      <HeroBanner heroBanner={bannerData?.[0]} />
      <Categories />

      <PopularProducts productsData={productsData} />
       <Features/>
    <CallButton/>
      <AboutSection />
    </>
  );
};

export default Home;
