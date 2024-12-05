import React from "react";
import { Product } from "../components";

const PopularProducts = ({ productsData }) => {
  return (
    <div>
      <h1>Popular Products</h1>
      <div className="products-container">
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;
