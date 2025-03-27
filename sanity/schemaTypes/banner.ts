//sanity/schemaTypes/banner.ts
const banner = {
  name: "banner",
  title: "Banner",
  type: "document",
  __experimental_actions: ["update", "publish"], // disables create/delete
  fields: [
    {
      name: "images",
      title: "Banner Images",
      type: "array",
      of: [
        {
          type: "image",
          options: { hotspot: true },
          fields: [{ name: "alt", title: "Alternative text", type: "string" }],
          preview: { select: { title: "alt", media: "asset" } },
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return { title: "Banner Images" };
    },
  },
};

export default banner;
