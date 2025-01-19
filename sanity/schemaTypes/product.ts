interface ImageField {
  name: string;
  title: string;
  type: string;
  of: { type: string }[];
  options: { hotspot: boolean };
}

interface StringField {
  name: string;
  title: string;
  type: string;
  validation: (Rule: any) => any;
}

interface SlugField {
  name: string;
  title: string;
  type: string;
  options: { source: string; maxLength: number };
  validation: (Rule: any) => any;
}

interface NumberField {
  name: string;
  title: string;
  type: string;
  validation: (Rule: any) => any;
}

interface TextField {
  name: string;
  title: string;
  type: string;
  validation: (Rule: any) => any;
}

interface CategoryField {
  name: string;
  title: string;
  type: string;
  options: {
    list: { title: string; value: string }[];
    layout: string;
  };
  validation: (Rule: any) => any;
}

interface BooleanField {
  name: string;
  title: string;
  type: string;
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

interface ProductSchema {
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

const productSchema: ProductSchema = {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{ type: 'image' }],
      options: { hotspot: true },
    },
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) =>
        Rule.required().min(2).max(50).warning('Name should be between 2 and 50 characters.'),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 90 },
      validation: (Rule) => Rule.required().warning('Slug is required.'),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) =>
        Rule.required().positive().precision(2).warning('Price must be a positive number.'),
    },
    {
      name: 'details',
      title: 'Details',
      type: 'text',
      validation: (Rule) => Rule.max(500).warning('Details should not exceed 500 characters.'),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Mirrors', value: 'mirrors' },
          { title: 'Wardrobe', value: 'wardrobe' },
          { title: 'Cabinet', value: 'cabinet' },
          { title: 'Waterproof', value: 'waterproof' },
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().warning('Category is required.'),
    },
    {
      name: 'width',
      title: 'Width',
      type: 'number',
      validation: (Rule) => Rule.min(0).warning('Width must be a positive number.'),
    },
    {
      name: 'isPopular',
      title: 'Popular',
      type: 'boolean',
      description: 'Mark this product as popular to display in the popular products section.',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.0',
      subtitle: 'category',
    },
  },
};

export default productSchema;
