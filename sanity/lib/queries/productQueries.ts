// Option B: Resolving the URL from the asset
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
    isPopular
  }
`;
