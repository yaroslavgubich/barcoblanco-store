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
          { title: "Wardrobe", value: "wardrobe" },
          { title: "Cabinet", value: "cabinet" },
          { title: "Waterproof", value: "waterproof" },
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
      name: "isPopular",
      title: "Popular",
      type: "boolean",
      description:
        "Mark this product as popular to display it in the popular products section.",
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
