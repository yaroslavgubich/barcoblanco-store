import React from "react";
import Product from "../components/Product";

interface ProductDetailsProps {
  productData: any; // Replace 'any' with the appropriate type if known
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productData }) => {
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
