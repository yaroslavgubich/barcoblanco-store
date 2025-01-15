export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              title: 'Alt Text',
              type: 'string',
              description: 'Alternative text for the image (important for accessibility and SEO).',
              options: {
                isHighlighted: true, // Displays input directly in the image editor
              },
            },
          ],
        },
      ],
      options: {
        hotspot: true, // Enables image cropping and focal point selection
      },
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
      options: {
        source: 'name',
        maxLength: 90,
      },
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
          {title: 'Mirrors', value: 'mirrors'},
          {title: 'Wardrobe', value: 'wardrobe'},
          {title: 'Cabinet', value: 'cabinet'},
          {title: 'Waterproof', value: 'waterproof'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required().warning('Category is required.'),
    },
    {
      name: 'width',
      title: 'Width',
      type: 'number',
      description: 'Width of the product in centimeters',
      validation: (Rule) => Rule.required().positive().warning('Width is required.'),
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image.0', // Displays the first image in the array as a preview
      subtitle: 'category',
    },
  },
}
