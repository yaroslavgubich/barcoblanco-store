import React from "react";
import { Product, HeroBanner } from "./components";
import { client } from "./lib/client";

const Home = async () => {
  // Fetch products and banner data from Sanity
  const query = '*[_type == "product"]';
  const products = await client.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return (
    <>
      {/* Render the Hero Banner */}
      <HeroBanner heroBanner={bannerData.length ? bannerData[0] : null} />

      <div className="products-heading">
        <h2>Popular Products</h2>
      </div>

      {/* Render the Products */}
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </>
  );
};

export default Home;
