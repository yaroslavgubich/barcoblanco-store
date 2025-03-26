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
  const { image, name, slug, price } = product;

  const imageUrl =
    image && Array.isArray(image) && image.length > 0
      ? image[0].asset.url
      : "/images/placeholder.svg";

  return (
    <Link href={`/productDetails/${slug.current}`} className="block">
      <div className="group flex flex-col items-center text-center p-4  rounded-lg  transition-transform cursor-pointer">
        <div className="w-[300px] h-[300px] overflow-hidden rounded-md ">
          <Image
            src={imageUrl}
            width={300}
            height={300}
            className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
            alt={name}
          />
        </div>
        <p className="mt-3 text-gray-800 text-lg font-medium">{name}</p>
        <p className="text-[#1996A3] font-bold text-xl">{price} грн</p>
      </div>
    </Link>
  );
};

export default Product;








