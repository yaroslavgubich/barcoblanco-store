"use client";
import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({
  product,
  isDetailPage = false,
}: {
  product: any;
  isDetailPage?: boolean;
}) => {
  const { image = [], name, slug, price, description, width } = product;
  // Assign imageUrl based on whether an image exists
  const imageUrl =
    image?.length > 0
      ? urlFor(image[0]).url() // If there’s an image, use it
      : "/images/placeholder.svg"; // Otherwise, use a placeholder image

  return (
    <div>
      {isDetailPage ? (
        // Detailed View (for product details page)
        <div className="product-details">
          <img
            src={imageUrl}
            width={400} // Larger image for detailed view
            height={400}
            className="product-image"
            alt={name}
          />
          <h1 className="product-name">{name}</h1>
          <p className="product-price">${price}</p>
          <p className="product-description">{description}</p>
          <p className="product-width">Width: {width} cm</p>
        </div>
      ) : (
        // Card View (default for homepage or product listing)
        <Link href={`/product/${slug.current}`}>
          <div className="product-card">
            <img
              src={imageUrl}
              width={250}
              height={250}
              className="product-image"
              alt={name}
            />
            <p className="product-name">{name}</p>
            <p className="product-price">${price}</p>
            <p className="product-width">Width: {width} cm</p>
          </div>
        </Link>
      )}
    </div>
  );
};

export default Product;
