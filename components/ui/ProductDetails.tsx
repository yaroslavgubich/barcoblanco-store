// components/ui/ProductDetails.tsx

import React from "react";
import Image from "next/image";

interface ProductDetailsProps {
  productData: {
    name: string;
    image: { asset: { url: string } }[];
    price: number;
    details: string;
    category: string;
    width?: number;
    isPopular?: boolean;
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productData }) => {
  const { name, image, price, details, category, width, isPopular } =
    productData;

  return (
    <div className="product-details-container">
      <h1 className="product-details-title">{name}</h1>
      {image?.length > 0 && (
        <Image
          src={image[0]?.asset?.url}
          alt={name}
          width={300}
          height={300}
          quality={75}
          className="product-details-image"
        />
      )}
      <p className="product-details-category">Category: {category}</p>
      <p className="product-details-price">Price: ${price}</p>
      <p className="product-details-description">{details}</p>
      {width && <p className="product-details-width">Width: {width} cm</p>}
      {isPopular && (
        <p className="product-details-popular">This is a popular product!</p>
      )}
    </div>
  );
};

export default ProductDetails;
