import React from "react";
import Product from "../components/Product";

const ProductDetails = ({ productData }) => {
  if (!productData) {
    return <div>No product found</div>;
  }

  return (
    <div>
      <Product product={productData} isDetailPage={true} />
    </div>
  );
};

export default ProductDetails;
