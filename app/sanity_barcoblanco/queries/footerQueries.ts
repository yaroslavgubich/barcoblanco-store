// Query for Footer content, excluding drafts
export const footerQuery = `*[_type == "footer" && !(_id in path("drafts.**"))]`
