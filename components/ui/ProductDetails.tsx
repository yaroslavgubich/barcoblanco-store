import React from "react";
import Image from "next/image"; // Import Image from next/image

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
    <div>
      <h1>{name}</h1>
      {image?.length > 0 && (
        <Image
          src={image[0]?.asset?.url} // Use the URL of the first image
          alt={name} // Alt text for accessibility
          width={300} // Specify width
          height={300} // Specify height
          quality={75} // Adjust quality (optional)
        />
      )}
      <p>Category: {category}</p>
      <p>Price: ${price}</p>
      <p>{details}</p>
      {width && <p>Width: {width} cm</p>}
      {isPopular && <p>This is a popular product!</p>}
    </div>
  );
};

export default ProductDetails;
