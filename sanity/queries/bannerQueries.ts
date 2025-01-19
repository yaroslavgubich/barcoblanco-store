// Query for Banners, excluding drafts
export const bannerQuery = `*[_type == "banner" && !(_id in path("drafts.**"))]`
