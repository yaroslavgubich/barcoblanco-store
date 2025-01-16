export const popularProductsQuery = `
  *[_type == "product" && isPopular == true] {
    _id,
    name,
    slug,
    price,
    width,
    image {
      asset-> {
        _id,
        url
      }
    }
  }
`
