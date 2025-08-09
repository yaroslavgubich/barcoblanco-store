"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

interface ProductProps {
  product: ProductType;
}

interface ProductType {
  _id?: string;
  image?: { asset: { url: string }; alt?: string }[] | null;
  name: string;
  slug: { current: string };
  price: number;
}

const Product: React.FC<ProductProps> = ({ product }) => {
  const { image, name, slug } = product;

  const imageUrl =
    image && Array.isArray(image) && image.length > 0
      ? image[0].asset.url
      : "/images/placeholder.svg";

  return (
    <Link href={`/productDetails/${slug.current}`} className="block">
      <div className="group flex flex-col items-center text-center p-3 rounded-lg transition-transform cursor-pointer">
        {/* Картинка */}
        <div className="w-full aspect-square overflow-hidden rounded-md bg-gray-100">
          <Image
            src={imageUrl}
            width={220}
            height={220}
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-105"
            alt={name}
          />
        </div>

        {/* Название */}
        <p className="mt-2 text-gray-800 text-base font-medium line-clamp-2 min-h-[48px]">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default Product;










