import React from "react";
import { Product, HeroBanner, Footer } from "./components";
import { client } from "./lib/client";

const Home = async () => {
  // Fetch banner data from Sanity
  const bannerQuery = `*[_type == "banner"] `;

  const bannerData = await client.fetch(bannerQuery);

  console.log("Server-Side Banner Data:", bannerData);
  console.log("Server-Side Banner Data first element:", bannerData);

  return (
    <>
      <HeroBanner heroBanner={bannerData?.[0]} />
      <Product />
      <Footer />
    </>
  );
};

export default Home;
