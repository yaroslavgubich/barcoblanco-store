// sanity/schemaTypes/product.ts
//sanity/schemaTypes/product.ts
const producjschema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [
        {
          type: "image",
          fields: [
            // Optional alt text field
            {
              name: "alt",
              title: "Alternative text",
              type: "string",
            },
          ],
          options: { hotspot: true },
        },
      ],
    },
    {
      name: "name",
      title: "Name",
      type: "string",
    },
    {
      name: "article",
      title: "Article",
      type: "string",
    },
    {
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 90 },
    },
    {
      name: "price",
      title: "Price",
      type: "number",
    },
    {
      name: "details",
      title: "Details",
      type: "text",
    },
    {
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Mirrors", value: "mirrors" },
          { title: "Wardrobes", value: "wardrobes" },
          { title: "Cabinets", value: "cabinets" },
          { title: "Waterproof", value: "waterproof" },
          { title: "dressers", value: "dressers" },
        ],
        layout: "dropdown",
      },
    },
    {
      name: "width",
      title: "Width",
      type: "number",
    },
    {
      name: "height",
      title: "Height",
      type: "number",
    },
    {
      name: "depth",
      title: "Depth",
      type: "number",
    },
    {
      name: "isPopular",
      title: "Popular",
      type: "boolean",
      description:
        "Mark this product as popular to display it in the popular products section.",
      initialValue: false,
    },
    {
      name: "isAvailable",
      title: "Is Available",
      type: "boolean",
      description:
        "Mark this product as available to display that it is in a warehouse.",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "name",
      media: "image.0",
      subtitle: "category",
    },
  },
};

export default producjschema;
