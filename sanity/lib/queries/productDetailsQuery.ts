export const productDetailsQuery = `*[_type == "product" && slug.current == $slug][0]{
    _id,
    name,
    slug, // Make sure to fetch the slug field if it's used in the component
    image[] { asset->{ url } },
    price,
    details,
    category,
    width,
    depth,
    height,
    isPopular,
    isAvailable,
    article
  }`;
