import React from "react";
import { client } from "../../lib/client";
import { categoryProductQuery } from "../../sanity_barcoblanco/queries/categoryProductQuery";
import { Product } from "../../components";

interface Props {
  params: { slug: string };
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = params;

  // Fetch products for the category
  const productsData = await client.fetch(categoryProductQuery(slug));

  return (
    <div>
      <h1>Products in {slug}</h1>
      <div className="products-grid">
        {productsData?.length > 0 ? (
          productsData.map((product: any) => (
            <Product key={product._id} product={product} />
          ))
        ) : (
          <p>No products found for this category.</p>
        )}
      </div>
    </div>
  );
}
