// app/(store)/productDetails/[slug]/page.tsx

import ProductDetails from "../../../../components/ui/ProductDetails";
import { client } from "../../../../sanity/lib/client";

// Function to fetch product data from Sanity using the slug.
async function getProduct(slug: string) {
  const query = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug, // Make sure to fetch the slug field if it's used in the component
    image[] { asset->{ url } },
    price,
    details,
    category,
    width,
    isPopular
  }`;
  return await client.fetch(query, { slug });
}

// Define the page props so that params is a Promise (Workaround 1)
type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function Page({ params }: PageProps) {
  // Await the parameters (ensuring we get a plain object with a slug)
  const { slug } = await params;
  const product = await getProduct(slug);

  if (!product) {
    return <div>Продукт не знайдено</div>;
  }

  // Render the styled ProductDetails component with the fetched product data.
  return <ProductDetails productData={product} />;
}
