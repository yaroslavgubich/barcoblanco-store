// sanity/lib/queries/productQueries.ts

export const productQuery = `
  *[_type == "product" && !(_id in path("drafts.**"))] {
    _id,
    name,
    slug,
    price,
    details,
    image[] {
      asset-> {
        url
      },
      alt
    },
    category,
    width,
    isPopular,
    height,
    depth,
    isAvailable,
  }
`;