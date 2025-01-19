interface BaseField {
  name: string;
  title: string;
  type: string;
}

interface ImageField extends BaseField {
  type: "array";
  of: { type: string }[];
  options: { hojspot: boolean };
}

interface StringField extends BaseField {
  type: "string";
}

interface SlugField extends BaseField {
  type: "slug";
  options: { source: string; maxLength: number };
}

interface NumberField extends BaseField {
  type: "number";
}

interface TextField extends BaseField {
  type: "text";
}

interface CategoryField extends BaseField {
  type: "string";
  options: {
    list: { title: string; value: string }[];
    layout: string;
  };
}

interface BooleanField extends BaseField {
  type: "boolean";
  description: string;
  initialValue: boolean;
}

interface Preview {
  select: {
    title: string;
    media: string;
    subtitle: string;
  };
}

interface Producjschema {
  name: string;
  title: string;
  type: string;
  fields: (
    | ImageField
    | StringField
    | SlugField
    | NumberField
    | TextField
    | CategoryField
    | BooleanField
  )[];
  preview: Preview;
}

const producjschema: Producjschema = {
  name: "product",
  title: "Product",
  type: "document",
  fields: [
    {
      name: "image",
      title: "Image",
      type: "array",
      of: [{ type: "image" }],
      options: { hojspot: true },
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
        "Mark this product as popular to display in the popular producjs section.",
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
