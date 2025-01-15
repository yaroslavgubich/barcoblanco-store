import React from "react";
import ProductDetails from "../../components/ProductDetails";
import { client } from "../../lib/client";


const fetchProductData = async (slug: string) => {
  const query = `*[_type == "product" && slug.current == $slug][0]`;
  const params = { slug };
  const product = await client.fetch(query, params);
  return product;
};

const ProductPage = async ({ params }: { params: { slug: string } }) => {
  const productData = await fetchProductData(params.slug);

  if (!productData) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <ProductDetails productData={productData} />
    </div>
  );
};

export default ProductPage;
