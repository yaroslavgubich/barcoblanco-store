import React from "react";
import { Product, HeroBanner, Footer } from "./components";
import { client } from "./lib/client";

const Home = async () => {
  const bannerQuery = `*[_type == "banner"]`;
  const productQuery = `*[_type == "product"]`;

  const bannerData = await client.fetch(bannerQuery);
  const productsData = await client.fetch(productQuery);

  return (
    <>
      <HeroBanner heroBanner={bannerData?.[0]} />
      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
