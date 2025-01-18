import React from "react";
import { Product } from "../components";

const PopularProducts = ({ productsData }) => {
  return (
    <div className="popular-products-wrapper">
      <h1 className="popular-products-title">Popular Products</h1>
      <div className="popular-products-marquee">
        <div className="popular-products-track">
          {productsData?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
          {/* Duplicate for seamless looping */}
          {productsData?.map((product) => (
            <Product key={`${product._id}-duplicate`} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularProducts;
