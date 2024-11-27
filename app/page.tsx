import React from "react";
import { Product, HeroBanner, Footer } from "./components";
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

      <Product/>

      {/* Render the Products */}
      <div className="products-container">
        {products.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Home;
