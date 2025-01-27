import { client } from "../client";
import { productQuery } from "../../../sanity/lib/queries/productQueries";

export const fetchProducts = async () => {
  const products = await client.fetch(productQuery);
  return products;
};
