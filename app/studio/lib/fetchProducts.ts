import { client } from "../../client";
import { productQuery } from "../queries/productQueries";

export const fetchProducts = async () => {
  const products = await client.fetch(productQuery);
  return products;
};
