import React from "react";
import {
  HeroBanner,
  Product,
  AboutSection,
  Categories,
  Footer,
} from "./components";
import { client } from "./lib/client";

const Home = async () => {
  const bannerQuery = `*[_type == "banner"]`;
  const productQuery = `*[_type == "product"]`;
  const footerQuery = `*[_type == "footer"]`;

  const bannerData = await client.fetch(bannerQuery);
  const productsData = await client.fetch(productQuery);
  const footerData = await client.fetch(footerQuery);

  return (
    <>
      <HeroBanner heroBanner={bannerData?.[0]} />
        <Categories />

        <h1>Popular Products</h1>
      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      

      <AboutSection />

      <Footer footer={footerData?.[0]} />
    </>
  );
};

export default Home;
