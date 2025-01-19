import React from "react";
import Image from "next/image";
import Link from "next/link";
import { fetchProducts } from "../studio/lib/fetchProducts";

interface Product {
  _id: string;
  name: string;
  slug: {
    current: string;
  };
  image: {
    asset: {
      url: string;
    };
  }[];
  price: number;
  category: string;
  details: string;
}

const ProductsPage = async () => {
  const products: Product[] = await fetchProducts();

  if (!products || products.length === 0) {
    return <div>No products found</div>;
  }

  return (
    <div>
      <h1>All Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            <h2>
              <Link href={`/product/${product.slug?.current}`}>
                {product.name}
              </Link>
            </h2>
            {product.image?.[0]?.asset?.url && (
              <Image
                src={product.image[0].asset.url}
                alt={product.name || "Product Image"}
                width={300}
                height={300}
              />
            )}
            <p>Price: ${product.price}</p>
            <p>Category: {product.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
