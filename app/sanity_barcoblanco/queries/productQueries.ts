// Queries related to products
export const productQuery = `*[_type == "product" && !(_id in path("drafts.**"))]`

