// components/ui/Product.tsx
"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  product: ProductType;
  isDetailPage?: boolean;
}

interface ProductType {
  _id?: string;
  image?: { asset: { url: string }; alt?: string }[] | null; // Allow null or undefined
  name: string;
  slug: { current: string };
  price: number;
  description?: string;
  width?: number;
}

const Product: React.FC<ProductProps> = ({ product, isDetailPage = false }) => {
  const { image, name, slug, price, description, width } = product;

  // Check if image exists and has at least one valid item
  const imageUrl =
    image && Array.isArray(image) && image.length > 0
      ? image[0].asset.url // ✅ Safe access
      : "/images/placeholder.svg"; // Default placeholder

  // (Optional) Get alt text if available
  const altText =
    image && Array.isArray(image) && image.length > 0 && image[0].alt
      ? image[0].alt
      : name;

  return (
    <div>
      {isDetailPage ? (
        // Detailed View
        <div className="product-details">
          <Image
            src={imageUrl}
            width={400}
            height={400}
            className="product-image"
            alt={altText}
          />
          <h1 className="product-name">{name}</h1>
          <p className="product-price">${price}</p>
          <p className="product-description">
            {description || "No description available."}
          </p>
          <p className="product-width">
            Width: {width ? `${width} cm` : "N/A"}
          </p>
        </div>
      ) : (
        // Card View (for listing)
        <Link href={`/productDetails/${slug.current}`}>
          <div className="product-card">
            <Image
              src={imageUrl}
              width={250}
              height={250}
              className="product-image"
              alt={altText}
            />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Product;
