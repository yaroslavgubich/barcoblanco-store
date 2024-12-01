// components/Product.jsx
"use client";
import React from "react";
import Link from "next/link";
import { urlFor } from "../lib/client";

const Product = ({ product }) => {
  const { image = [], name, slug, price } = product;

  // Assign imageUrl based on whether an image exists
  const imageUrl =
    image.length > 0
      ? urlFor(image[0])
      : "/images/placeholder.svg";

  return (
    <div>
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
        </div>
      </Link>
    </div>
  );
};

export default Product;
