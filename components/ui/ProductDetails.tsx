// components/ui/ProductDetails.tsx
"use client";

import React from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

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

export default function ProductDetails({ productData }: ProductDetailsProps) {
  const { name, image, price, details, category, width, isPopular } = productData;
  
  // Retrieve the addToCart function from our cart context
  const { addToCart } = useCart();

  // Handle adding the product to the cart
  const handleAddToCart = () => {
    addToCart({
      id: name, // Ideally use a unique _id from Sanity if available
      name: name,
      price: price,
      image: image?.[0]?.asset?.url || "/images/placeholder.svg",
      quantity: 1,
    });
  };

  return (
    <Card className="max-w-8xl mx-auto bg-white shadow-lg rounded-lg p-6">
      <CardContent className="flex flex-col md:flex-row gap-6">
        {/* Image Section */}
        <div className="flex-1">
          {image && image.length > 0 && (
            <Image
              src={image[0].asset.url}
              alt={name}
              width={0}
              height={0}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full h-auto rounded-lg object-contain"
            />
          )}
          <CardDescription className="text-gray-600">
            {category}
          </CardDescription>
        </div>

        {/* Product Details Section */}
        <div className="flex-1 p-6 space-y-4">
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{name}</CardTitle>
          </CardHeader>
          <p className="text-xl font-semibold text-gray-900">
            Price: ${price}
          </p>
          <p className="text-gray-700">{details}</p>
          {width && <p className="text-gray-500">Width: {width} cm</p>}
          {isPopular && (
            <p className="text-green-500 font-semibold">🔥 Popular Product</p>
          )}
          <Button
            onClick={handleAddToCart}
            className="w-3/4 bg-[#1996a3] hover:bg-[#147a86] text-white"
          >
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
